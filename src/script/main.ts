import { v4 as uuidv4 } from 'uuid';

const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
let todoList = document.querySelector(".todo-list") as HTMLElement;
let inputAdd = document.getElementById("input-add") as HTMLInputElement;

const savedTodo: todoTypes[] = JSON.parse(localStorage.getItem('savedTodo') ||  '[]');

type todoTypes = {
    id: string,
    title: string,
}

function createTodo():void {
    if (inputAdd && inputAdd.value.trim() !== "") {
        const newTodo: todoTypes = {
            id: uuidv4(),
            title: inputAdd.value,
        };

        savedTodo.push(newTodo);
        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
        console.log(savedTodo)
        displayTodo()
    } else {
        if (inputAdd) {
            inputAdd.style.border = "2px solid #cc0000"
            inputAdd.style.color = "#cc0000"
        }

    }
}

function displayTodo():void {
    if (savedTodo.length === 0) {
        todoList.innerHTML = `<h3>no saved todo items</h3>`;
    } else {
        todoList.innerHTML = '';
        savedTodo.forEach((todo) => {
            todoList.innerHTML += 
            `<div class="todo-box" id="${todo.id}">
                <i class="fa-regular fa-square check-toggle" id="check-toggle"></i>
                <input type="text" id="check-text" value="${todo.title}" readonly>
                <i class="fa-solid fa-pen-to-square check-edit" id="check-edit"></i>
                <i class="fa-regular fa-circle-xmark check-remove" id="check-remove"></i>
            </div>`
        });
    
        inputAdd.value = '';
    }
}

function toggleTodo():void {

}

function editTodo(target: HTMLElement):void {
    const idStr = target.closest('div')?.getAttribute('id')?? '';
    
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);

    }
}

function removeTodo(target: HTMLElement):void {
    const idStr = target.closest('div')?.getAttribute('id')?? '';
    
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        savedTodo.splice(index, 1)
        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
        displayTodo()
    }
}

function listClick(event: Event):void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('check-toggle')) {
        toggleTodo();
    } else if (target.classList.contains('check-edit')) {
        editTodo(target);
    } else if (target.classList.contains('check-remove')) {
        removeTodo(target);
    }
}

window.addEventListener("DOMContentLoaded", displayTodo)

if (inputAdd) {
    inputAdd.addEventListener('click', () => {
        inputAdd.style.color = "var(--text-dark)"
        inputAdd.style.border = "2px solid black"
    });
}

todoList.addEventListener("click", listClick);
btnAdd?.addEventListener("click" , createTodo);