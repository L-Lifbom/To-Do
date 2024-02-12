// <i class="fa-solid fa-square-check" id="check-toggle"></i>
import { v4 as uuidv4 } from 'uuid';
const btnAdd = document.getElementById("btn-add");
const savedTodo = [];
function createTodo() {
    let inputAdd = document.getElementById("input-add");
    if (inputAdd instanceof HTMLInputElement && inputAdd.value.trim() !== "") {
        const newTodo = ({
            id: uuidv4(),
            title: inputAdd.value,
        });
        savedTodo.push(newTodo);
        console.log(savedTodo);
        updateTodo(inputAdd);
    }
    else {
        alert("No input entered.");
    }
}
function updateTodo(inputAdd) {
    let todoList = document.querySelector(".todo-list");
    if (savedTodo.length === 0) {
        todoList.innerHTML = `<h1>no saved todo items</h1>`;
    }
    else {
        todoList.innerHTML = '';
        savedTodo.forEach((todo) => {
            todoList.innerHTML +=
                `<div class="todo-box" id="${todo.id}">
                <i class="fa-regular fa-square" id="check-toggle"></i>
                <input type="text" id="check-text" value="${todo.title}" readonly>
                <i class="fa-solid fa-pen-to-square" id="check-edit"></i>
                <i class="fa-regular fa-circle-xmark" id="check-remove"></i>
            </div>`;
        });
        inputAdd.value = '';
    }
}
window.addEventListener("DOMContentLoaded", () => {
    updateTodo;
});
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", createTodo);
