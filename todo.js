const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; // toDo 생성시 여기 arrays에 추가

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage는 string 타입만 저장 가능, JSON.stringify로 자바스크립트 object 타입을 string으로 변환
}

function paintToDo(text) {
  const li = document.createElement("li"); // li 태그 생성
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span); // 무언가를 부모에게 append 하는거, li태그에 span태그 append
  li.id = newId; // li 속성에 id 값 줘서 어떤 번호인지 확인
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault(); // event 금지, submit 후 새로고침 금지
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //JSON.parse로 stirng을 자바스크립트 object타입으로 변환
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
