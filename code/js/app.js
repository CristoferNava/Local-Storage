document.addEventListener('DOMContentLoaded', loadItemsLocalStorage);
let sumbit = document.getElementById('form');
sumbit.addEventListener('submit', addItem);
let itemsList = document.getElementById('items-list');
itemsList.addEventListener('click', removeItem);

function loadItemsLocalStorage() {
  let items = getItemsLocalStorage();
  items.forEach(item => {
    createItem(item);
  });
}

function createItem(itemText) {
  let item = document.createElement('li');
  item.innerText = itemText;

  let removeButton = document.createElement('a');
  removeButton.className = 'borrar-tweet';
  removeButton.innerText = 'X';
  item.appendChild(removeButton);

  itemsList.appendChild(item); 
}

function getItemsLocalStorage() {
  let items = localStorage.getItem('items');
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }

  return items;
}

function addItem() {
  let itemText = document.getElementById('item').value;
  createItem(itemText);
  addItemLocalStorage(itemText);
}

function addItemLocalStorage(item) {
  let items = getItemsLocalStorage();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

function removeItem(e) {
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    removeItemLocalStorage(e.target.parentElement.innerText);
  }
}

function removeItemLocalStorage(itemX) {
  let items = getItemsLocalStorage();
  let item = itemX.substring(0, itemX.length - 1);
  
  items.forEach((itemValue, index) => {
    if (item === itemValue) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}