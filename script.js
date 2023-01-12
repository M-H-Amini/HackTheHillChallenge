// Get references to the form, input, task list, and clear tasks button
const form = document.querySelector('form');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
const clearTasksBtn = document.querySelector('#clear-tasks');

// Load existing tasks from local storage
let tasks;
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}else{
    tasks = [];
}
renderTasks();

// Add task function
function addTask(e) {
    e.preventDefault();
    const task = taskInput.value;
    if (task === '') {
      return;
    }
    // Add task to the beginning of the array
    tasks.unshift(task);
    // Clear the input
    taskInput.value = '';
    // Render the tasks
    renderTasks();
    //store in localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
// function removeTask(task) {
//     task.parentElement.classList.add("fadeOut");
//     setTimeout(function(){ 
//         task.parentElement.remove();
//     }, 500);
// }
function removeTask(i) {
    tasks.splice(i, 1);
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks function
function clearTasks() {
    tasks = [];
    renderTasks();
    localStorage.removeItem('tasks');
}

// Render tasks function
function renderTasks() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = tasks[i] + '<button onclick="removeTask('+i+')">X</button>';
        taskList.appendChild(li);
    }
}

// Event listeners
form.addEventListener('submit', addTask);
clearTasksBtn.addEventListener('click', clearTasks);
