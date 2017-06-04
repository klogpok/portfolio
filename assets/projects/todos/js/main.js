var KEY_TODOS = 'todos';

console.log('Todos!');

var gState = getInitialState();
var gElStatus = document.querySelectorAll('.status > label >input');


function getInitialState() {
    var state = loadFromStorage(KEY_TODOS);
    if (!state) {
        state = {
            todos: getInitialTodos(),
            archivedTodos: []
        }
    }
    return state;
}

function init() {
    renderTodos(gState.todos);
    gElStatus[1].setAttribute('checked', 'checked');
}

function getInitialTodos() {
    var todos = [];
    todos.push(getTodo('Learn Javascript'));
    todos.push(getTodo('Practive HTML'));
    todos.push(getTodo('Master CSS'));
    return todos;
}

function getTodo(txt) {
    return { txt: txt, isDone: false }
}

function renderTodos(todos) {
    var elTodos = document.querySelector('.todos');

    var strHtmls = todos.map(function (todo, idx) {
        var strChecked = (todo.isDone) ? ' checked ' : '';
        // var strActive = (!todo.isDone) ? '<i class="fa fa-caret-up" aria-hidden="true" onclick="changePlace(' + idx + ')"></i> \
        //      <i class="fa fa-caret-down" aria-hidden="true" onclick="changePlace(' + idx + ')></i>' : '';

        return `<li>
                    <input type="checkbox" id="c${idx}" ${strChecked} onchange="todoClicked(this , ${idx})" />
                    <label for="c${idx}"><span></span>${todo.txt}</label>   
                    
                </li>`
    });

    elTodos.innerHTML = strHtmls.join('');
}

function todoClicked(el, idx) {

    console.dir(el.checked);

    if (!el.checked) {
        var tmp = gState.archivedTodos.splice(idx , 1);
        tmp[0].isDone = false;
        gState.todos.push(tmp[0]);
        gElStatus[0].setAttribute('checked', 'checked');
    } else {
        var todo = gState.todos[idx];
        todo.isDone = !todo.isDone;
    }

    saveToStorage(KEY_TODOS, gState);
    renderTodos(gState.todos.concat(gState.archivedTodos));
}

function archiveDone() {
    gState.todos = gState.todos.filter(function (todo) {
        if (todo.isDone) gState.archivedTodos.push(todo);
        return !todo.isDone;
    });
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function addTodo() {
    var txt = prompt('New Todo');
    var todo = getTodo(txt);
    gState.todos.push(todo);
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function setFilter(event) {
    if (event.target.value) {
        var selectedFilter = event.target.value;
        var todos;
        switch (selectedFilter) {
            case 'active': 
                todos = gState.todos;
                break;
            case 'archived': 
                todos = gState.archivedTodos;
                break;
            case 'all': 
               todos = gState.todos.concat(gState.archivedTodos);
               break;    
                
        }
        renderTodos(todos);
    }
}

function changePlace(idx, sign) {
    console.log('ggg');
}