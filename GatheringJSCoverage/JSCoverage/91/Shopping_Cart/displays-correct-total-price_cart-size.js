window.addEventListener('load', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) ;
    document.getElementById('cart-link').innerHTML = `Cart (${cart.length})`;
});
