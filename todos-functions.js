'use strict'
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }

}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.todo.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    document.querySelector('#todos').innerHTML = ''

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    
    filteredTodos.forEach((todo) => {
       const p = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(p)
    })

}

// Remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// check todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    }) 

    if (todo) {
        todo.completed = !todo.completed
    }
}

const generateTodoDOM = (todo) => {
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
    
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoCheck.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

        return todoDiv
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}