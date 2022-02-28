
    import * as Frame from './frame.js';

    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (!cartItems) 
    let priceTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let itemPrice = Frame.calculatePrice(cartItems[i].printSize, cartItems[i].frameStyle, cartItems[i].frameWidth, cartItems[i].matWidth);
        priceTotal += itemPrice;
    }
    document.getElementById("price-subtotal").innerHTML = `${priceTotal}`;

    fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(data => data.json())
        .then(data => {
            const select = document.getElementById('country');
            for (const dest of data.destinations) {
                const opt = document.createElement('option');
                opt.value = dest.country;
                opt.setAttribute('data-cost', dest.cost);
                opt.innerHTML = dest.displayName;
                select.appendChild(opt);
            }
            window.calculateTotalPrice();
        });


    window.calculateTotalPrice = function () {
        let select = document.getElementById('country');
        let shipping = parseInt(select.options[select.selectedIndex].getAttribute('data-cost')) / 100;
        let priceWithShipping = priceTotal + shipping;

        if(select.selectedIndex >= 0){
            document.getElementById("price-shipping").innerHTML = `${shipping.toFixed(2)}`;
            document.getElementById("price-total").innerHTML = `${priceWithShipping.toFixed(2)}`;
            document.getElementById('pay-button').disabled = false;
        }
    };

    window.calculateTotalPrice();
