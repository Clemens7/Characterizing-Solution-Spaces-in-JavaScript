

  function calcTotalPrice() {
    document.getElementById("price-shipping").textContent = (countryCosts[document.getElementById("country").value] / 100).toFixed(2);
    document.getElementById("price-total").textContent = parseFloat(document.getElementById("price-subtotal").textContent) + parseFloat(document.getElementById("price-shipping").textContent);
  }

  