export function updateCartCounter() {
  const element = document.getElementById("cart-link");
  if (element) {
    const items = getItems();
    let text = "Cart";
    if (items.length > 0) {
      text = `${text} (${items.length})`
    }

    element.innerText = text;
  }
}

export 

export function removeConfiguration(index) {
  const items = getConfigurationList();
  items.splice(index, 1);

  setItems(items);
  updateCartCounter();
}

export function getConfigurationList() {
  return getItems();
}


function setItems(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

function getItems() {
  return JSON.parse(localStorage.getItem("cart")) 