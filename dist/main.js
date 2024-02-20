import { v4 as uuidv4 } from 'uuid';
const btnAdd = document.getElementById("btn-add");
let todoList = document.querySelector(".todo-list");
let inputAdd = document.getElementById("input-add");
const savedTodo = JSON.parse(localStorage.getItem('savedTodo') || '[]');
function createTodo() {
    if (inputAdd && inputAdd.value.trim() !== "") {
        const newTodo = {
            id: uuidv4(),
            title: inputAdd.value,
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
        }
    }
}
function displayTodo() {
    if (savedTodo.length === 0) {
        todoList.innerHTML = `<h3>no saved todo items</h3>`;
    }
    else {
        todoList.innerHTML = '';
        savedTodo.forEach((todo) => {
            todoList.innerHTML +=
                `<div class="todo-box" id="${todo.id}">
                <i class="fa-regular fa-square check-toggle" id="check-toggle"></i>
                <input type="text" id="check-text" value="${todo.title}" readonly>
                <i class="fa-solid fa-pen-to-square check-edit" id="check-edit"></i>
                <i class="fa-regular fa-circle-xmark check-remove" id="check-remove"></i>
            </div>`;
        });
        inputAdd.value = '';
    }
}
function toggleTodo() {
}
function editTodo(target) {
    var _a, _b;
    const idStr = (_b = (_a = target.closest('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
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
    if (target.classList.contains('check-toggle')) {
        toggleTodo();
    }
    else if (target.classList.contains('check-edit')) {
        editTodo(target);
    }
    else if (target.classList.contains('check-remove')) {
        removeTodo(target);
    }
}
window.addEventListener("DOMContentLoaded", displayTodo);
if (inputAdd) {
    inputAdd.addEventListener('click', () => {
        inputAdd.style.color = "var(--text-dark)";
        inputAdd.style.border = "2px solid black";
    });
}
todoList.addEventListener("click", listClick);
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", createTodo);
