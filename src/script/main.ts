import { v4 as uuidv4 } from 'uuid';

const btnAdd = document.querySelector(".btn-add") as HTMLButtonElement;
const todoList = document.querySelector(".todo-list") as HTMLElement;
let inputAdd = document.querySelector(".input-add") as HTMLInputElement;
const deleteAllBtn = document.querySelector(".delete-all-btn") as HTMLButtonElement;

let savedTodo: todoTypes[] = JSON.parse(localStorage.getItem('savedTodo') ||  '[]');

type todoTypes = {
    id: string,
    title: string,
    toggle: boolean,
}

function createTodo():void {
    if (inputAdd && inputAdd.value.trim() !== "") {
        const newTodo: todoTypes = {
            id: uuidv4(),
            title: inputAdd.value,
            toggle: false,
        };

        savedTodo.push(newTodo);
        localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
        console.log(savedTodo)
        displayTodo()
    } else {
        if (inputAdd) {
            inputAdd.style.border = "2px solid #cc0000"
            inputAdd.style.color = "#cc0000"
            inputAdd.classList.add('shake');

            setTimeout(() => {
                inputAdd.classList.remove('shake');
            }, 500);

            setTimeout(() => {
                inputAdd.style.color = "var(--text-dark)"
                inputAdd.style.border = "2px solid black"
            }, 10000);
        }

    }
}

function displayTodo():void {
    if (savedTodo.length === 0) {
        todoList.innerHTML = `<h3>no saved tasks</h3>`;
    } else {
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
            </div>`
        });
    
        inputAdd.value = '';
    }
}

function toggleTodo(target: HTMLElement):void {
    const idStr = target.closest('div')?.getAttribute('id')?? '';
    
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        if (index !== -1) {
            savedTodo[index].toggle = !savedTodo[index].toggle; // Toggle the status
            console.log(savedTodo)
            // Update Local Storage
            localStorage.setItem('savedTodo', JSON.stringify(savedTodo));

            // Re-display todos to reflect changes
            displayTodo();
        }
    }
}

function editTodo(target: HTMLElement):void {
    const idStr = target.closest('div')?.getAttribute('id')?? '';
    if (idStr) {
        const index = savedTodo.findIndex(item => item.id === idStr);
        console.log(index)
        
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
    if (target.classList.contains('todo-toggle')) {
        toggleTodo(target);
    } else if (target.classList.contains('todo-edit')) {
        editTodo(target);
    } else if (target.classList.contains('todo-remove')) {
        removeTodo(target);
    }
}

function clearList() {
    savedTodo = [];
    localStorage.setItem('savedTodo', JSON.stringify(savedTodo));
    displayTodo()
}

window.addEventListener("DOMContentLoaded", displayTodo)

if (inputAdd) {
    inputAdd.addEventListener('click', () => {
        inputAdd.style.color = "var(--text-dark)"
        inputAdd.style.border = "2px solid black"
    });

    inputAdd.addEventListener('input', () => {
        inputAdd.style.color = "var(--text-dark)"
        inputAdd.style.border = "2px solid black"
    });
}

inputAdd.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        createTodo()
    }
})

todoList.addEventListener("click", listClick);
btnAdd?.addEventListener("click" , createTodo);
deleteAllBtn?.addEventListener("click", clearList)