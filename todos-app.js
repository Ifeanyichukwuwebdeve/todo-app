'use strict'
const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-todos').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        todo: e.target.elements.todos.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    
    e.target.elements.todos.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

