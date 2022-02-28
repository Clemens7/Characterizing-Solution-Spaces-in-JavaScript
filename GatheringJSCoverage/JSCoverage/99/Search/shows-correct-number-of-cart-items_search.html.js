
    let storage = localStorage.getItem("cart");
    if(storage == null) else {
      document.getElementById("cart-link").innerHTML = "Cart (" + JSON.parse(storage).length + ")";
    }
  
  