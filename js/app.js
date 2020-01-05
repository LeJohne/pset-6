const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

const check = "fa-check-circle";
const uncheck = "fa-check-thin"
const linethrough = "lineThrough"

function addToDo(toDo){
  const text = '
                <i class="fa fa-circle thin co" job="complete" id= "0"></i>
                <p class="text">${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete" id="0"</i>
               ';
  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}
addToDo("drink coffee")


document.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo);
    }
    input.value = ""
  }

});
