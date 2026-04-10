let list = document.getElementById("list");
let addbtn = document.getElementById("addbtn");
let input = document.getElementById("input");

// 🔥 Get Data + Clean Bad Data
function getData() {
    let data = localStorage.getItem("todos");
    let todos = data ? JSON.parse(data) : [];

    // ✅ Remove empty/invalid todos
    return todos.filter(todo => 
        todo.text && todo.text.trim() !== ""
    );
}

// 🔥 Save Data
function saveData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = getData();

// 🔥 Render Todos
function renderTodos(filter = "all") {
    list.innerHTML = "";

    let filteredTodos = todos.filter(todo => {
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        createTodo(todo);
    });
}

// 🔥 Create Todo UI
function createTodo(todo) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.onchange = function () {
        todo.completed = checkbox.checked;
        saveData();
        renderTodos();
    };

    let text = document.createElement("p");
    text.textContent = todo.text;

    if (todo.completed) {
        text.style.textDecoration = "line-through";
    }

    // ✏ Edit Button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function () {
        let newText = prompt("Edit your task:", todo.text);

        if (newText && newText.trim() !== "") {
            todo.text = newText.trim();
            saveData();
            renderTodos();
        }
    };

    // ❌ Delete Button
    let delBtn = document.createElement("button");
    delBtn.textContent = "DEL";

    delBtn.onclick = function () {
        todos = todos.filter(t => t.id !== todo.id);
        saveData();
        renderTodos();
    };

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
}

// 🔥 Add Task
addbtn.onclick = function () {
    let task = input.value.trim();

    // ✅ Prevent empty tasks
    if (!task) {
        alert("Enter a valid task!");
        return;
    }

    let newTodo = {
        id: Date.now(),
        text: task,
        completed: false
    };

    todos.push(newTodo);
    saveData();
    renderTodos();

    input.value = "";
};

// 🔥 Initial Load
renderTodos();