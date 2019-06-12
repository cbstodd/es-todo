/* ##################### FUNCTIONS ##################### */

import { saveTodosToLocalStorage, renderAlertMsg, getSavedTodos, getFilters } from './data';
import uuidv4 from 'uuid';

let todos = getSavedTodos();
const filters = getFilters();
/* -------------------------------------
    RENDERING / FILTERING
-------------------------------------- */
// Render application todos based on filters
export const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.body.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    document.querySelector('#todos').innerHTML = '';
    filteredTodos.forEach((todo) => {
        if (!todo.completed) {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo));
        }
    });

    const completedTodos = filteredTodos.filter((todo) => {
        return todo.completed;
    });

    document.querySelector('#completedTodos').innerHTML = '';
    completedTodos.forEach((todo) => {
        document.querySelector('#completedTodos').appendChild(generateCompletedTodoDOM(todo));
    });

    generateSummaryDOM(completedTodos);
};

// Get the DOM elements for an individual note
export const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const deletedButton = document.createElement('button');
    const editTodo = document.createElement('a');

    // Render todos checkbox
    checkbox.setAttribute('type', 'checkbox');
    todoEl.appendChild(checkbox);
    checkbox.addEventListener('change', (e) => {
        toggleCompletedTodo(todo.id);
        // renderTodos(todos, filters);
    });

    // Render the todos body
    todoText.textContent = todo.body;
    // todoEl.appendChild(todoText);

    // Render todos as an editable link:
    editTodo.innerHTML = `<a href="/edit.html#${todo.id}" title="Edit: ${todo.body}">${todo.body}</a>`;
    todoEl.appendChild(editTodo);

    // Render the Delete button
    deletedButton.innerHTML = '<i class="fa fa-trash-alt" title="Delete Todo"></i>';
    todoEl.appendChild(deletedButton);
    deletedButton.addEventListener('click', (e) => {
        deleteTodo(todo.id);
        // renderTodos(todos, filters);
    });


    return todoEl;
};

export const generateCompletedTodoDOM = (todo) => {
    const todoEl = document.createElement('div');
    todoEl.setAttribute('class', 'completed');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const deletedButton = document.createElement('button');
    const todoEditLink = document.createElement('a');
    // const loc = location.assign(`http://localhost:3000/edit.html#${todos.id}`);

    // Render todos checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = true;
    todoEl.appendChild(checkbox);
    checkbox.addEventListener('change', (e) => {
        toggleCompletedTodo(todo.id);
        // renderTodos(todos, filters);
    });

    // Render the todos body
    todoText.textContent = todo.body;
    // todoEl.appendChild(todoText);

    // Render Edit link with todos text:
    todoEditLink.innerHTML = `<a href="/edit.html#${todo.id}">${todo.body}</a>`;
    todoEl.appendChild(todoEditLink);

    // Render the Delete button
    deletedButton.innerHTML = '<i class="fa fa-trash-alt" title="Delete Todo"></i>';
    todoEl.appendChild(deletedButton);
    deletedButton.addEventListener('click', (e) => {
        deleteTodo(todo.id);
        // renderTodos(todos, filters);
    });


    return todoEl;
};

// Get the DOM elements for list subtitle
export const generateSummaryDOM = (completedTodos) => {
    const subtitle = document.createElement('p');
    subtitle.innerHTML = `<p class="subtitle">You have <u>${completedTodos.length}</u> todos left</p>`;
    return subtitle;
};

export const alertBtnMsg = (_newTodoBody) => {
    // Updates text on button (alert):
    const newTodoBtn = document.getElementById('addTodoBtn');
    newTodoBtn.textContent = `"${_newTodoBody}" was added!!!`;
    setTimeout(() => {
        newTodoBtn.innerHTML = `<i class="fa fa-plus"></i> Add Todo`;
    }, 2000);
};


/* -------------------------------------
    CRUD OPERATIONS
-------------------------------------- */
export const addTodo = (todoBody) => {
    const _id = uuidv4();
    const newTodo = {
        id: `${_id}`,
        body: todoBody,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    todos.push(newTodo);
    saveTodosToLocalStorage(todos);
    alertBtnMsg(todoBody);
    renderAlertMsg(`${todoBody} was Added!`, '');
};

export const deleteTodo = (id) => {
    const remainingTodos = todos.filter((todo) => {
        if (todo && id) {
            return todo.id !== id;
        } else {
            console.error('Todo not available');
            alert('Todo not available');
            return null;
        }
    });
    todos = remainingTodos;
    saveTodosToLocalStorage(todos);
    renderTodos(todos, filters);
};

export const toggleCompletedTodo = (id) => {
    let todo = todos.filter((_todo) => {
        if (_todo && id) {
            return _todo.id === id;
        } else {
            console.error('Todos or ID not found');
            return null;
        }
    });

    if (todo[ 0 ].id && todo[ 0 ].body && todo[ 0 ].createdAt && (todo[ 0 ].completed === false)) {
        const completedTodo = {
            id: `${todo[ 0 ].id}`,
            body: todo[ 0 ].body,
            completed: true,
            createdAt: todo[ 0 ].createdAt,
            updatedAt: Date.now()
        };

        deleteTodo(id);
        // saveTodosToLocalStorage(todos);
        todos.push(completedTodo);
        saveTodosToLocalStorage(todos);
        renderTodos(todos, filters);
    } else if (todo[ 0 ].id && todo[ 0 ].body && todo[ 0 ].createdAt && (todo[ 0 ].completed === true)) {
        const completedTodo = {
            id: `${todo[ 0 ].id}`,
            body: todo[ 0 ].body,
            completed: false,
            createdAt: todo[ 0 ].createdAt,
            updatedAt: Date.now()
        };

        deleteTodo(id);
        // saveTodosToLocalStorage(todos);
        todos.push(completedTodo);
        saveTodosToLocalStorage(todos);
        renderTodos(todos, filters);
    } else {
        console.error('Todo not available');
        return null;
    }

};
