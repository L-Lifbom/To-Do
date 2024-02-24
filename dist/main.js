import { v4 as uuidv4 } from 'uuid';
const btnAdd = document.querySelector(".btn-add");
const todoList = document.querySelector(".todo-list");
let inputAdd = document.querySelector(".input-add");
const deleteAllBtn = document.querySelector(".delete-all-btn");
let savedTodo = JSON.parse(localStorage.getItem('savedTodo') || '[]');
function createTodo() {
    if (inputAdd && inputAdd.value.trim() !== "") {
        const newTodo = {
            id: uuidv4(),
            title: inputAdd.value,
            toggle: false,
            priority: "Low",
        };
        savedTodo.push(newTodo);
        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
        console.log(savedTodo);
        displayTodo();
    }
    else {
        if (inputAdd) {
            inputAdd.style.border = "2px solid #cc0000";
            inputAdd.style.color = "#cc0000";
            inputAdd.classList.add('shake');
            setTimeout(() => {
                inputAdd.classList.remove('shake');
            }, 500);
            setTimeout(() => {
                inputAdd.style.color = "var(--text-dark)";
                inputAdd.style.border = "2px solid black";
            }, 10000);
        }
    }
}
function displayTodo() {
    if (savedTodo.length === 0) {
        todoList.innerHTML = `<h3>no saved tasks</h3>`;
    }
    else {
        const displayTodos = [...savedTodo].sort((a, b) => {
            // Sort by priority then by toggle
            if (a.toggle !== b.toggle) {
                return a.toggle ? 1 : -1; // Toggled tasks (true) go to the bottom
            }
            // For non-toggled tasks, sort by priority
            if (!a.toggle && !b.toggle) {
                const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return 0; // For toggled tasks or if both have the same toggle status and priority
        });
        todoList.innerHTML = '';
        displayTodos.forEach((todo) => {
            const textDecoration = todo.toggle ? 'text-decoration: line-through;' : '';
            const backgroundColor = todo.toggle ? 'background-color: grey;' : '';
            const checkbox = todo.toggle
                ? ` class="fa-solid fa-square-check todo-toggle"`
                : ` class="fa-regular fa-square todo-toggle" "`;
            const priorityColor = todo.toggle === true ? "var(--text-dark)" : todo.priority === "High" ? "#cc0000" : todo.priority === "Medium" ? "#CCCC00" : "#00CC00";
            todoList.innerHTML +=
                `<div class="todo-box" id="${todo.id}" style="${backgroundColor}">
                <i ${checkbox} id="toggle-${todo.id} title="Toggle"></i>
                <input type="text" class="todo-input" value="${todo.title}" readonly style="${textDecoration}">
                <i class="fa-solid fa-lightbulb todo-priority" title="${todo.priority}" style="color: ${priorityColor};"></i>
                <i class="fa-solid fa-pen-to-square todo-edit" id="edit-${todo.id}" title="Edit"></i>
                <i class="fa-regular fa-circle-xmark todo-remove" id="remove-${todo.id}" title="Remove"></i>
            </div>`;
        });
        inputAdd.value = '';
    }
}
function toggleTodo(target) {
    var _a, _b;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        if (index !== -1) {
            savedTodo[index].toggle = !savedTodo[index].toggle; // Toggle the status
            console.log(savedTodo);
            // Update Local Storage
            localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
            // Re-display todos to reflect changes
            displayTodo();
        }
    }
}
function priorityTodo(target) {
    var _a, _b;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        if (index !== -1) {
            const todo = savedTodo[index];
            // Cycle through priorities
            todo.priority = todo.priority === "Low" ? "Medium" : todo.priority === "Medium" ? "High" : "Low";
            localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
            displayTodo(); // Refresh display
        }
    }
}
function editTodo(target) {
    var _a, _b, _c;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        if (index !== -1) {
            const input = (_c = target.closest('div')) === null || _c === void 0 ? void 0 : _c.querySelector('.todo-input');
            if (input) {
                input.readOnly = false;
                input.focus();
                // Set the value to itself to move the cursor to the end
                const currentValue = input.value;
                input.value = '';
                input.value = currentValue;
                input.style.backgroundColor = "var(--clr-background-1)";
                input.style.color = "var(--text-light)";
                const saveEdit = (input, index) => {
                    if (!input.value) {
                        savedTodo.splice(index, 1);
                        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
                        displayTodo();
                    }
                    else {
                        savedTodo[index].title = input.value;
                        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
                        input.readOnly = true;
                        displayTodo();
                    }
                };
                // Update to handle event listeners more efficiently
                const saveOnEnter = function (event) {
                    if (event.key === 'Enter') {
                        saveEdit(input, index);
                        input.removeEventListener('keypress', saveOnEnter);
                    }
                };
                const saveOnBlur = function () {
                    saveEdit(input, index);
                    input.removeEventListener('blur', saveOnBlur);
                };
                input.addEventListener('keypress', saveOnEnter);
                input.addEventListener('blur', saveOnBlur);
            }
        }
    }
}
function removeTodo(target) {
    var _a, _b;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        savedTodo.splice(index, 1);
        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
        displayTodo();
    }
}
function listClick(event) {
    const target = event.target;
    if (target.classList.contains('todo-toggle')) {
        toggleTodo(target);
    }
    else if (target.classList.contains('todo-priority')) {
        priorityTodo(target);
    }
    else if (target.classList.contains('todo-edit')) {
        editTodo(target);
    }
    else if (target.classList.contains('todo-remove')) {
        removeTodo(target);
    }
}
function clearList() {
    savedTodo = [];
    localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
    displayTodo();
}
window.addEventListener("DOMContentLoaded", displayTodo);
if (inputAdd) {
    inputAdd.addEventListener('click', () => {
        inputAdd.style.color = "var(--text-dark)";
        inputAdd.style.border = "2px solid black";
    });
    inputAdd.addEventListener('input', () => {
        inputAdd.style.color = "var(--text-dark)";
        inputAdd.style.border = "2px solid black";
    });
}
inputAdd.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        createTodo();
    }
});
todoList.addEventListener("click", listClick);
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", createTodo);
deleteAllBtn === null || deleteAllBtn === void 0 ? void 0 : deleteAllBtn.addEventListener("click", clearList);
