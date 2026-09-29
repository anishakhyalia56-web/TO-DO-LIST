const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map(task => {
    if (typeof task === "string") {
        return {
            text: task,
            completed: false
        };
    }

    return task;
});

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.cursor = "pointer";

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.5";
        }

        span.onclick = function () {
            completeTask(index);
        };

        const button = document.createElement("button");
        const editButton = document.createElement("button");
editButton.textContent = "Edit";

editButton.onclick = function () {
    const newTask = prompt("Edit your task:", task.text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTasks();
    }
};
        button.textContent = "Delete";

        button.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(button);

        taskList.appendChild(li);
    });

    const completedTasks = tasks.filter(task => task.completed).length;

    taskCount.textContent = `Total Tasks: ${tasks.length} | Completed: ${completedTasks}`;
}

addButton.onclick = function () {
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    showTasks();
};

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

showTasks();