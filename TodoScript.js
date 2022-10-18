const taskInput = document.querySelector(".taskInput input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clearBtn"),
taskBox = document.querySelector(".taskBox");

let editId, isEditTask = false,
todos = JSON.parse(localStorage.getItem("todoList"));

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter){
    let liTag="";
    if(todos){
        todos.forEach((todo,id)=>{
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all"){
                liTag+=`<li class="task">
                    <label for = "${id}">
                        <input onclick="updateStatus(this)" type = "checkbox"  id="${id}" ${completed}>
                        <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="setings">
                            <i onclick="showMenu(this)" class = "uil uil-ellipsis-h"></i>
                            <ul class="taskMenu">
                                <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(seletctedTask){
    let menuDiv = seletctedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click",e=>{
        if(e.target.tagName != "I" || e.target != seletctedTask ){
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(seletctedTask){
    let taskName = seletctedTask.parentElement.lastElementChild;
    if(seletctedTask.checked){
        taskName.classList.add("checked");
        todos[seletctedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[seletctedTask.id].status = "pending";
    }
    localStorage.setItem("todoList",JSON.stringify(todos))
}

function editTask(taskId,textName){
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}
function deleteTask(deleteId,filter){
    isEditTask = false;
    todos.splice(deleteId,1);
    localStorage.setItem("todoList",Jason.stringify(todos));
    showTodo(filter);
}
clearAll.addEventListener("click",()=>{
    isEditTask = false;
    todos.splice(0,todos.length);
    localStorage.setItem("todoList",JSON.stringify(todos));
    showTodo();
});

taskInput.addEventListener("keyup", e =>{
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditTask){
            todos = !todos?[]:todos;
            let taskInfo = { name: userTask, status: "pending"};
            todos.push(taskInfo);
        }else{
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value="";
        localStorage.setItem("todoList",JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});