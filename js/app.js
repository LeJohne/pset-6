const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST = []
    , id = 0;

//To Do Function

function addToDo(toDo, id, done, trash){

  if(trash){ return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id= "${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete" id="${id}"</i>
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
      addToDo(toDo);

      LIST.push({
        name : toDo?
        id : id,
        done : false,
        trash : false
      });

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

  LIST[element.id].done = LIST [element.id].done ? false : true;
}

//Remove Function
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//Target function

list.addEventListener("click", function(event){
  const element = even.target;
  const elementJob = element.attributes.job.value;
  if(elementJob == "complete"){
    completeToDo(element);
  }else if(elementJob == "remove"){
    removeToDo(element);
  }
});
