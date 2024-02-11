"use strict";
// <i class="fa-solid fa-square-check" id="check-toggle"></i>
//import { v4 as uuidv4 } from 'uuid';
const btnAdd = document.getElementById("btn-add");
let savedTodo = [];
function createTodo() {
    let inputAdd = document.getElementById("input-add");
    if (inputAdd instanceof HTMLInputElement && inputAdd.value.trim() !== "") {
        console.log("start");
    }
    else {
        console.log("No input provided!");
    }
}
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", createTodo);
