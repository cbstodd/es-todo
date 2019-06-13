/* ##################### TODOs-EDIT ##################### */
import { saveTodosToLocalStorage, renderAlertMsg, getSavedTodos } from './data';
// Gets id from location hash path 1 to to rest
const todoBody = document.querySelector('#editTodoInput');
const todoId = location.hash.substring(1);

let allTodos = getSavedTodos();

const todo = allTodos.find((_todo) => {
    return _todo.id === todoId;
});

if (todo === undefined) {
    location.assign('/');
}
// Grabs the current todos value and auto-loads into the input (kinda like ng FormControlName):
todoBody.value = todo.body;

// Is the update form:
document.getElementById('updateTodoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editTodoBodyForm = e.target.elements.editTodoInput.value;
    if (editTodoBodyForm) {
        updateTodo(editTodoBodyForm);
    } else {
        console.warn('No Todo was provided, please type a todo before adding.');
        alert('No Todo was provided, please type a todo before adding.');
    }
});

window.addEventListener('storage', (e) => {
    // Adds two way data-binding.
    if (e.key === 'todos') {
        allTodos = JSON.parse(e.newValue);
        console.log('e.key', e.key);
        console.log('allTodos', allTodos);

        const todo = allTodos.find((_todo) => {
            return _todo.id === todoId;
        });

        if (todo === undefined) {
            location.assign('/');
        }
        todoBody.value = todo.body;
    }
});


// CRUD operations:
const deleteTodo = (id) => {
    const remainingTodos = allTodos.filter((todo) => {
        if (todo && id) {
            return todo.id !== id;
        } else {
            console.error('Todo not available');
            alert('Todo not available');
            return null;
        }
    });
    allTodos = remainingTodos;
    saveTodosToLocalStorage(allTodos);
};

const updateTodo = (todoEditBody) => {
    const updatedTodo = {
        id: `${todo.id}`,
        body: todoEditBody,
        completed: todo.completed,
        completedAt: todo.completedAt || null,
        createdAt: todo.createdAt,
        updatedAt: Date.now()
    };

    deleteTodo(todo.id);
    allTodos.push(updatedTodo);
    saveTodosToLocalStorage(allTodos);
    renderAlertMsg(`"${todoEditBody}" was updated!`, '/');
};
