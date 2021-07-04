const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const remove = document.querySelector(".remove");
let items = [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  console.log(text);
  const obj = {
    text,
    done: false,
  };
  items.push(obj);
  localStorage.setItem("items", JSON.stringify(items));
  populate();
}

function populate() {
  items = [...JSON.parse(localStorage.getItem("items"))];
  const markup =
    items &&
    items
      .map((item, i) => {
        return `<li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
          item.done ? "checked" : ""
        } />
        <label for="item${i}">${item.text}</label>
      </li>`;
      })
      .join("");
  itemsList.innerHTML = markup;
}

window.onload = populate();

function toggleDone(e) {
  const target = e.target;
  let index = target.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
}

function clearAll() {
  items.length = 0;
  localStorage.setItem("items", JSON.stringify(items));
  populate();
}

function unCheckAll() {
  items.forEach((i) => {
    i.done = false;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populate();
}

function checkAll() {
  items.forEach((i) => {
    i.done = true;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populate();
}
remove.children[0].addEventListener("click", clearAll);
remove.children[1].addEventListener("click", unCheckAll);
remove.children[2].addEventListener("click", checkAll);

itemsList.addEventListener("click", toggleDone);
addItems.addEventListener("submit", addItem);
