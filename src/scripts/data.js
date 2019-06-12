// ####################### DATA ##########################
// Save todos to localStorage
export const saveTodosToLocalStorage = (todos) => {
    if (todos && typeof todos === 'object') {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (e) {
            return [];
        }
    } else {
        renderErrorMsg('Todo not saved/updated, was not a JSON object');
        throw Error('Todos NOT saved/updated, was not a JSON object');
    }
};

// FILTERS:
export const getFilters = () => {
    return {
        searchText: '',
        hideCompleted: false,
        sortType: ''
    };
};

// CHECK FOR EXISTING TODOS:
export const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        console.info('No todos available in storage');
        return [];
    }
};

// ALERTS
export const renderAlertMsg = (msg, ...redirectPath) => {
    const alert = document.getElementById('alertMsg');
    alert.setAttribute('class', 'alert alert-success');
    alert.innerHTML = `${msg}`;
    setTimeout(() => {
        alert.setAttribute('class', '');
        alert.innerHTML = '';
    }, 1500);
    if (redirectPath) {
        console.log('redirecting');
        console.log(redirectPath);
        setTimeout(() => location.assign(`${redirectPath}`), 1550);
    }
};

export const renderErrorMsg = (msg) => {
    const alert = document.getElementById('alertMsg');
    alert.setAttribute('class', 'alert alert-danger');
    alert.innerHTML = `${msg}`;
    setTimeout(() => {
        alert.setAttribute('class', '');
        alert.innerHTML = '';
    }, 1500);
};
