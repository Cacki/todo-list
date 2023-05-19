const todos = document.querySelector(".list");
const searchInput = document.querySelector(".search-input");
const addInput = document.querySelector(".add-input");
const addButton = document.querySelector(".add-button");
const todoKey = "todo";
let todoArray = [];

const removeError = () => {
  addInput.classList.remove("error");
};

const isTodoExist = (content) =>
  todoArray.some((todo) => todo.text === content.toLowerCase());

const formatText = () => {
  let content = addInput.value.replace(/\s+/g, " ");
  content = content.trim();
  content = content.toLowerCase();

  return content;
};

const addToArray = (content) => {
  todoArray.push({ text: `${content}` });
  localStorage.setItem(todoKey, JSON.stringify(todoArray));
};

const createTodo = (todoValue) => {
  let deleteImage = document.createElement("img");
  let imgContainer = document.createElement("div");
  let textContainer = document.createElement("div");
  let itemContainer = document.createElement("div");
  let listItem = document.createElement("li");

  deleteImage.src = "images/icons8-delete.svg";
  deleteImage.alt = "delete";
  imgContainer.appendChild(deleteImage);
  imgContainer.setAttribute("class", "img-container");

  textContainer.appendChild(document.createTextNode(todoValue));
  textContainer.setAttribute("class", "text-container");

  itemContainer.appendChild(textContainer);
  itemContainer.appendChild(imgContainer);
  itemContainer.setAttribute("class", "item-container");

  listItem.appendChild(itemContainer);
  listItem.setAttribute("class", "list-item");
  todos.appendChild(listItem);
  setTimeout(() => {
    itemContainer.classList.add("show");
    listItem.classList.add("show");
  }, 25);
};

const addTodo = () => {
  let content = formatText();
  if (content && !isTodoExist(content)) {
    createTodo(content);
    addToArray(content);
  } else {
    addInput.classList.add("error");
  }
  addInput.value = "";
};

const removeFromArray = (itemContainer) => {
  const todoToRemove = itemContainer.firstElementChild.innerText.toLowerCase();
  todoArray = todoArray.filter((obj) => obj.text !== todoToRemove);
  localStorage.setItem(todoKey, JSON.stringify(todoArray));
};

const removeTodo = (target) => {
  if (target.nodeName == "IMG") {
    while (!(target.nodeName == "LI")) {
      target = target.parentElement;
    }
    const itemContainer = target.firstElementChild;
    itemContainer.classList.remove("show");
    removeFromArray(itemContainer);
    target.ontransitionend = () => {
      target.remove();
    };
  }
};

searchInput.addEventListener("input", (event) => {
  const searchText = searchInput.value.trim();
  const liArray = Array.from(todos.children);

  liArray.forEach((li) => {
    if (!li.innerText.toLowerCase().includes(searchText)) {
      li.firstElementChild.classList.remove("show");
      li.classList.add("vanish");
    } else {
      li.firstElementChild.classList.add("show");
      li.classList.remove("vanish");
    }
  });
});

addInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event === "Enter") {
    addTodo();
  }
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTodo();
});

todos.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;
  removeTodo(target);
});

if (localStorage.getItem(todoKey)) {
  todoArray = JSON.parse(localStorage.getItem(todoKey));
  todoArray.forEach((todo) => {
    createTodo(todo.text);
  });
}
