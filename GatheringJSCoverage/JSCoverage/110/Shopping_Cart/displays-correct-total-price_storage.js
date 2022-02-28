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

export 

export function getConfigurationList() {
  return getItems();
}




function getItems() {
  return JSON.parse(localStorage.getItem("cart")) 