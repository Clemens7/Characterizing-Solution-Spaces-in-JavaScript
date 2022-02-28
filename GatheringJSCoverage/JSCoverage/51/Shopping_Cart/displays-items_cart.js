//get all the cart item in a list
var buttons = document.getElementsByClassName('cart-item');

//get all the close buttons in a list
var buttonAmt = document.getElementsByClassName('cart-remove');
//console.log("before the for loop");

// price List of every item 
var cartItemsAbove = document.getElementById('cart-link');
var priceList = document.getElementsByClassName('cart-price');

//if cart is empty at the beginning
if (localStorage.getItem("Cart") === null) {
    console.log("Anfang ist es 0 items");
    document.querySelector('.price').textContent = "There are no items in your shopping cart.";
    document.getElementById('checkout-button').disabled = true;
    updateCartNumbers(priceList.length);

}






function updateCartNumbers(itemNumbers) {
    if (localStorage.getItem("Cart") === null) {
        localStorage.setItem("Cart") = 0;
        document.getElementById("cart-link").innerHTML = "Cart";
    }
}








//Hans Memling 459054
//Vincent van Gogh 436535

/*
var newItem = `<div class="cart-item">
    <div class="cart-preview" id="preview-container-0">
      <a href="">
        <img class="cart-thumb" src="${newItemImage}" id="preview-0" alt="">
      </a>
    </div>
    <div class="museum-label">
      <div>
        <span class="artist">${newItemName}</span>
        <span class="title">${newItemTitle}</span>,
        <span class="date">${newItemDate}</span>
        <br><br>
        <span class="frame-description">Small print in a 5 cm classic frame.</span>
      </div>
      <div class="cart-price">€ <span id="price-0">80.00</span></div>
      <button class="cart-remove"></button>
    </div>
  </div>`;

//my exports
//export {subTotal};
*/

