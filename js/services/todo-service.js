const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'importance'

_createTodos()

function getTodosForDisplay() {

    gTodos = _sortByKey(gTodos, gSortBy)

    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, imp) {
    const todo = _createTodo(txt, imp)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(SortBy) {
    gSortBy = SortBy
    console.log('gSortBy:', gSortBy)
}

function getTotalTodos() {
    if (!gTodos.length) return 'No Todos'
    return gTodos.length
}
function getActiveTodos() {
    if (!gTodos.filter(todo => !todo.isDone).length) return 'No Active Todos'
    return gTodos.filter(todo => !todo.isDone).length
}
function getDoneTodos() {
    if (!gTodos.filter(todo => todo.isDone).length) return 'No Done Todos'
    return gTodos.filter(todo => todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
           
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, imp) {
    return {
        txt: txt,
        createdAt: Date.now(),
        importance: imp,
        id: _makeId(),
        isDone: false
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    })
}
