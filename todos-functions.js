const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

if (todosJSON !== null) {
    return JSON.parse(todosJSON)
} else {
    return []
}
}

const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}


const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.todo.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    document.querySelector('#todos').innerHTML = ''

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    
    filteredTodos.forEach(function (todo) {
       const p = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(p)
    })

}

// Remove todo
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// check todo
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    }) 

    if (todo != undefined) {
        todo.completed = !todo.completed
    }
}

const generateTodoDOM = function (todo) {
    const todoDiv = document.createElement('div')
    const todoEl = document.createElement('span')
    const todoCheck = document.createElement('input')
    const button = document.createElement('button')

    todoCheck.setAttribute('type', 'checkbox')
    todoDiv.appendChild(todoCheck)
    todoCheck.checked = todo.completed
    button.textContent = 'x'

    todoEl.textContent = todo.todo

    todoDiv.appendChild(todoEl)
    todoDiv.appendChild(button)
    
    button.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoCheck.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

        return todoDiv
}

const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}