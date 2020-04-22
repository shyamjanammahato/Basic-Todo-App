//Selectors
const todoInput =  document.querySelector(".todo-input");
const todoButton =  document.querySelector(".todo-button");
const todoList =  document.querySelector(".todo-list");
const filterOption =  document.querySelector(".filter-todo");

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  //create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todo to local localStorage
  saveLocalTodos(todoInput.value);
  //Check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);
  //delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  todoDiv.appendChild(deleteButton);

  //append to list
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = '';
}


function deleteCheck(e) {
  const item = e.target;
  //Delete todo
  if(item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //remove element after animation completed
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })
  }
  //check mark
  if(item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check for do i already have things there?
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  //check for do i already have things there?
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //append to list
    todoList.appendChild(todoDiv);
  });
}


function remeoveLocalTodo(todo) {
  let todos;
  //check for do i already have things there?
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todo.indexOf(todoIndex, 1));
  localStorage.setItem("todos", JSON.stringify(todos)); 
}
