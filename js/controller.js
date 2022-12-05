
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
    document.querySelector('.done-todos').innerText = getDoneTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (!txt) return alert('Please enter text')
    const elImp = document.querySelector('input[name="todo-importance"]')
    const imp = elImp.value
    // console.log('txt', txt)
    addTodo(txt, imp)
    elTxt.value = ''
    elImp.value = ''
    renderTodos()
    console.log('gTodos:', gTodos)
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    var isApprove = confirm('Sure You Want To Delete?')
    if (!isApprove) return
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(SortBy) {
    console.log('SortBy:', SortBy)
    setSort(SortBy)
    // sortTodos(SortBy)
    renderTodos()
}


