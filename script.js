const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

if (darkMode) document.body.classList.add("dark");
renderTasks();

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Enter a task");

  tasks.push({ text, completed: false });
  save();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  save();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${i})">
        <span>${task.text}</span>
      </div>
      <button class="delete" onclick="deleteTask(${i})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    JSON.stringify(document.body.classList.contains("dark"))
  );
};
