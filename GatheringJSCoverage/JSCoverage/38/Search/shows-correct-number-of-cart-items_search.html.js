
    document.getElementById("cart-link").innerHTML = "Cart (" + JSON.parse(localStorage.getItem('cart')).length  +")";
  