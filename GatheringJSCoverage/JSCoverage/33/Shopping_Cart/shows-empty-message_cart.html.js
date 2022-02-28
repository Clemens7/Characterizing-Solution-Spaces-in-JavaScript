
        import * as frame from './frame.js';
        import {updateCartSize} from "./cart.js";
        import {getImage} from "./image-api.js"

        async function show() {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let totalPrice = 0;

            //Reset Page
            updateCartSize();
            document.getElementById("cart").innerHTML = "";

            if (cart )  else {
                document.getElementById("cart").insertAdjacentHTML("afterbegin", "<h1 style='margin-right: 1rem'>There are no items in your shopping cart.</h1><br>");
                document.getElementById("cart").appendChild(createTotal(0))
                document.getElementById("checkout-button").disabled = true;
            }
        }

        function createTotal(price) {
            let total = document.createElement('div');
            total.setAttribute("class", "cart-total");

            total.innerHTML = "<div class=\"price\">Total: € <span id=\"price-total\">" + price + "</span></div>\n" +
                "<button type=\"button\" id=\"checkout-button\">Checkout</button>\n"

            total.addEventListener('click', )

            return total;
        }

        

        

        

        (function () {
            // your page initialization code here
            // the DOM will be available here
            show();
        })();
    