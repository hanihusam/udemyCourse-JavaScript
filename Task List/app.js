// Define UI Vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// Load all event listeners
LoadEventListeners();
// Load all event listeners
function LoadEventListeners() {
  // DOM Loaded event
  document.addEventListener("DOMContentLoaded", loadList);
  // Add a new task event
  form.addEventListener("submit", addTask);
  // Remove a task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Load task list
function loadList() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Create close icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li element
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);
  });
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

// Remove a Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // Remove task from Local Storage event
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Please add a task");
  } else {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Create close icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li element
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);
    // Store tasks to Local Storage event
    storeTaskToLocalStorage(taskInput.value);
    // Clear task form
    taskInput.value = "";
  }
}

// Store task
function storeTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
