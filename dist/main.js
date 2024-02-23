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
            if (a.toggle !== b.toggle) {
                return Number(a.toggle) - Number(b.toggle);
            }
            return savedTodo.indexOf(a) - savedTodo.indexOf(b);
        });
        todoList.innerHTML = '';
        displayTodos.forEach((todo) => {
            const textDecoration = todo.toggle ? 'text-decoration: line-through;' : '';
            const backgroundColor = todo.toggle ? 'background-color: grey;' : '';
            const checkbox = todo.toggle
                ? ` class="fa-solid fa-square-check todo-toggle" id="toggle-${todo.id}"`
                : ` class="fa-regular fa-square todo-toggle" id="toggle-${todo.id}"`;
            todoList.innerHTML +=
                `<div class="todo-box" id="${todo.id}" style="${backgroundColor}">
                <i ${checkbox}></i>
                <input type="text" class="todo-input" value="${todo.title}" readonly style="${textDecoration}">
                <i class="fa-solid fa-pen-to-square todo-edit" id="edit-${todo.id}"></i>
                <i class="fa-regular fa-circle-xmark todo-remove" id="remove-${todo.id}"></i>
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
function editTodo(target) {
    var _a, _b;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        console.log(index);
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
