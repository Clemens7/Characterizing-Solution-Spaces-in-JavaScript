

            import * as Config from './config.js';
            import * as Frame from './frame.js';

            document.addEventListener('DOMContentLoaded', async event => {
                await updateData();
            });

            document.getElementById("checkout-button").onclick =
                ;

            async function updateData() {
                const cartTag = document.getElementById('cart');
                const checkoutElement = document.getElementsByClassName('cart-total')[0];

                const cartString = localStorage.getItem('cart');

                if (cartString === null ) {
                    const messageDiv = document.createElement("div");
                    messageDiv.className = "cart-item";
                    messageDiv.innerText = "There are no items in your shopping cart.";
                    cartTag.insertBefore(messageDiv, checkoutElement);
                    const buttonTag = document.getElementById('checkout-button');
                    
                    buttonTag.disabled = true;
                    document.getElementById('cart-link').innerText = "Cart";
                    return;
                }}

            

            

            

            
        