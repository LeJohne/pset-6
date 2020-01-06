const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const NORMAL = "fa-exclamation"
const PRIORITY = "fa-exclamation-circle"
const LINE_THROUGH = "lineThrough";

let LIST, id;

//localstorage Retrieve
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
  LIST = [];
  id = 0;
}

function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash)
  });
}

//Localstorage remove
clear.addEventListener("click",function(){
  localStorage.clear();
  location.reload();
});

//To Do Function

function addToDo(toDo, id, done, trash){

  if(trash){ return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const PRIOR = done ? PRIORITY : NORMAL;

  const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id= "${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa ${PRIOR} po" job="priority" id="${id}"></i>
                <i class="fa fa-trash-o de" job="delete" id="${id}"</i>
                </li>`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// Adding item by pressing enter key
document.addEventListener("keyup", function(even){
  if(event.keyCode == 13){
    const toDo = input.value;

    //Checks input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false, false);

      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false,
        priority : false
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//Complete Function
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove Function
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//Priority function
function priorityToDo(element){
  element.classList.toggle(NORMAL);
  element.classList.toggle(PRIORITY);
  element.parentNode.querySelector(".text").classList.toggle()

  LIST[element.id].priority = LIST[element.id].priority ? false : true
}

//Target Complete & Trash function

list.addEventListener("click", function(event){
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if(elementJob == "complete"){
    completeToDo(element);
  }else if(elementJob == "delete"){
    removeToDo(element);
  }else if(elementJob == "priority"){
    priorityToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//Target Priority Functions
