require('dotenv').config();
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/Todo');
// const User = require('./models/User');
const {
    ObjectID
} = require('mongodb');
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    Todo.find({})
        .then(
            (todos) => res.status(200).send({
                todos: todos
            }),
            (err) => res.status(400).send(err)
        );
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id; // gets input req id string value.

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                console.log('Id NOT FOUND for todo');
            }
            res.status(200).send({
                todo: todo
            });
        })
        .catch((err) => res.status(400).send(err));
});

app.post('/todos', (req, res) => {
    const todo = new Todo({
        id: req.body.id,
        body: req.body.body,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    todo.save()
        .then(
            (todo) => res.status(200).send(todo),
            (err) => res.status(400).send(err)
        )
        .catch((err) => new Error(err));
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then(
        (todo) => res.status(200).send(todo),
        (err) => res.status(400).send(err)
    );
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    // User only permitted to update text & completed.
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // Marks item as completed or not
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        })
        .then((todo) => {
            if (!todo) {
                return res.status(400).send();
            }
            res.status(200).send(todo);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports.app = app;