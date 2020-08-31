// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));

// Event Listeners
document.addEventListener('DOMContentLoaded', getToDos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions


function addTodo(event){

    if (todoInput.value == "") {
        alert("Enter a task :)");
    } else {
    // Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
    // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);  
        
    // ADD TODO to Local Storage
    saveLocalTodos(todoInput.value);
        
    todoDiv.appendChild(newTodo);  
    }



// Checkmark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

// Check TRASH Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

// Append to List
todoList.appendChild(todoDiv);

// Clear Todo input value
todoInput.value = "";
}

function deleteCheck() {
    const item = event.target;

// Delete TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // Remove
        todo.addEventListener('transitionend', function() {
         todo.remove();
        });
    }

// CHECK MARK
if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    }   
}

// Filter TODO
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

// Save Local TODO
    function saveLocalTodos(todo) {
        // CHECK -- HEY Do I already have things in there?
        let todos;
        if (localStorage.getItem('todos') === null) {
            // If not, create empty array
            todos = [];
        } else { //Retrieve items back into the array
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        // Save into Local Storage
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Get TODOS
    function getToDos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo) {

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
        
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
        
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);
        
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);
        
        todoList.appendChild(todoDiv);
        });
    }

    function removeLocalTodos(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            // If not, create empty array
            todos = [];
        } else { //Retrieve items back into the array
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

