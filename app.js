const titleName = document.querySelector("header h1 span");

function checkName() {
  if (!localStorage.getItem("userName")) {
    inputName = prompt("Please Enter Your Name!");
    localStorage.setItem("userName", inputName);
    titleName.innerHTML = localStorage.getItem("userName") + "'S";
  } else {
    titleName.innerHTML = localStorage.getItem("userName") + "'S";
  }
}

checkName();

const add = document.querySelector("form button");
const form1 = document.querySelector("#form1");
//autoInput
function autoInput() {
  form1[0].value = "make cake";
  form1[1].value = "12";
  form1[2].value = "5";
}
//clear todo-form
function clearContent() {
  form1[0].value = "";
  form1[1].value = "";
  form1[2].value = "";
}

const info = document.querySelector("#info");
add.addEventListener("click", (e) => {
  //prevent form submitting
  e.preventDefault();

  // get the input value
  let form = e.target.parentElement;
  let formText = form.children[0].value;
  let formMonth = form.children[1].value;
  let formDate = form.children[2].value;

  //* 這裡要判斷使用者有沒有在todolist裡面輸入內容 沒有的話就不讓他新增

  if (formText === "") {
    alert("PLEASE INPUT SOMETHING IN FIELD");

    //! 如果沒加return的話 後面的程式碼還是會執行 也就是說還會在新增一個空白的todo-item
    return;
  }

  //create a todo item
  const todo = document.createElement("div");
  todo.classList.add("todo");
  todo.setAttribute("draggable", true);

  const text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = formText;
  const date = document.createElement("p");
  date.classList.add("todo-time");
  date.innerText = `${formMonth} / ${formDate}`;

  //create remove button
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.innerText = "REMOVE";
  removeBtn.addEventListener("click", function (e) {
    const item = e.target.parentElement;

    // * 當動畫結束的時候 把item移除掉
    item.addEventListener("animationend", function () {
      let todo_text = todo.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));

      let listData = myListArray.filter((el) => el.todoText !== todo_text);

      myListArray = JSON.stringify(listData);
      localStorage.setItem("list", myListArray);
      item.remove();
    });
    //forwards 動畫結束後 保留在最後一個影格
    item.style.animation = "scaleDown 1s forwards";
  });

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("doneBtn");
  doneBtn.innerText = "DONE";
  doneBtn.addEventListener("click", function (e) {
    const item = e.target.parentElement;
    item.classList.toggle("done");
  });

  //add element in info
  todo.appendChild(text);
  todo.appendChild(date);
  todo.appendChild(removeBtn);
  todo.appendChild(doneBtn);
  //animation
  todo.classList.add("animate__animated");
  todo.classList.add("animate__pulse");
  todo.style.animationDuration = "0.5s";

  // * create a todo object
  let myTodo = {
    todoText: formText,
    todoMonth: formMonth,
    todoDate: formDate,
  };

  //store data into array of object
  let myList = localStorage.getItem("list");
  // console.log(myList);  如果沒有設定list 會印出null
  /**
   * localStorage的內容
   * 1.key value pair
   * 2.key不能重複
   * 3.必須要是字串
   * */
  if (myList == null) {
    //原本是 [{},{},{}] 先轉換成字串
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    //先把拿到的資料換成json格式 [{},{},{}]

    let listArray = JSON.parse(myList);
    //在push進去陣列裡
    listArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(listArray));
  }

  //可以查看list裡的東西
  //console.log(localStorage.getItem("list"));

  //新增到info裡
  info.appendChild(todo);
  //加進去清單後 把原本的清除掉
  clearContent();
});

let myListArray = JSON.parse(localStorage.getItem("list"));

if (myListArray !== null) {
  for (let el of myListArray) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = el.todoText;
    const date = document.createElement("p");
    date.classList.add("todo-time");
    date.innerText = `${el.todoMonth} / ${el.todoDate}`;

    //create remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.innerText = "REMOVE";
    removeBtn.addEventListener("click", function (e) {
      const item = e.target.parentElement;

      // * 當動畫結束的時候 把item移除掉
      item.addEventListener("animationend", function () {
        let todo_text = todo.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));

        let listData = myListArray.filter((el) => el.todoText !== todo_text);
        myListArray = JSON.stringify(listData);
        localStorage.setItem("list", myListArray);
        item.remove();
      });
      //forwards 動畫結束後 保留在最後一個影格
      item.style.animation = "scaleDown 1s forwards";
    });

    //create done button
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneBtn");
    doneBtn.innerText = "DONE";
    doneBtn.addEventListener("click", function (e) {
      const item = e.target.parentElement;
      item.classList.toggle("done");
    });

    //add element in info
    todo.appendChild(text);
    todo.appendChild(date);
    todo.appendChild(removeBtn);
    todo.appendChild(doneBtn);
    info.appendChild(todo);
    //animation
    todo.classList.add("animate__animated");
    todo.classList.add("animate__pulse");
    todo.style.animationDuration = "0.5s";
  }
}
