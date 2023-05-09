const todos = document.querySelector('.list');
const searchInput = document.querySelector('.search-input');
const addInput = document.querySelector('.add-input');
const addButton = document.querySelector('.add-button');

searchInput.addEventListener('input', event => {
  const searchText = searchInput.value.trim();
  const liArray = Array.from(todos.children);

  liArray.forEach(li => {
    if (!li.innerText.includes(searchText)) {
      li.firstElementChild.classList.remove('show');
      li.classList.add('vanish');
    } else {
      li.firstElementChild.classList.add('show');
      li.classList.remove('vanish');
    }
  });
});

addInput.addEventListener('keyup', event => {
  event.preventDefault();
  if (event === 'Enter') {
    addTodo();
  }
});

addButton.addEventListener('click', event => {
  event.preventDefault();
  addTodo();
});

todos.addEventListener('click', event => {
  event.preventDefault();
  var target = event.target;
  if (target.nodeName =='IMG') {
    while (!(target.nodeName == 'LI')) {
      target = target.parentElement;
    }
    target.firstElementChild.classList.remove('show');
    target.ontransitionend = () => {
      target.remove();
    }
}});
//functions
const removeError = () => { addInput.classList.remove('error') };

const addTodo = () => {
  let content = addInput.value; 

  if (content) {
    createTodo(content);
  } else {
    addInput.classList.add('error');
  }
  addInput.value = '';
}

const createTodo = todoValue => {
  let deleteImage = document.createElement('img');
  let imgContainer = document.createElement('div');
  let textContainer = document.createElement('div');
  let itemContainer = document.createElement('div');
  let listItem = document.createElement('li');

  deleteImage.src = 'images/icons8-delete.svg';
  deleteImage.alt = 'delete';
  imgContainer.appendChild(deleteImage);
  imgContainer.setAttribute('class', 'img-container');

  textContainer.appendChild(document.createTextNode(todoValue));
  textContainer.setAttribute('class', 'text-container');

  itemContainer.appendChild(textContainer);
  itemContainer.appendChild(imgContainer);
  itemContainer.setAttribute('class', 'item-container');

  listItem.appendChild(itemContainer);
  listItem.setAttribute('class', 'list-item');
  todos.appendChild(listItem);
  setTimeout( () => {
    itemContainer.classList.add('show');
    listItem.classList.add('show');
  }, 25);
  // addHeight(listItem.clientHeight);
}

const addHeight = addHeight => {
  const newHeight = todos.clientHeight + addHeight;
  todos.style.clientHeight = newHeight;
  todos.style.transition = "clientHeight 1s ease";
}