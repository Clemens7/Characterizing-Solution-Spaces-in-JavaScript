
        import * as frame from './frame.js';
        import {updateCartSize} from "./cart.js";
        import {getImage} from "./image-api.js"

        async function show() {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let totalPrice = 0;

            //Reset Page
            updateCartSize();
            document.getElementById("cart").innerHTML = "";

            if (cart && cart.length > 0) {
                for (const item of cart) {
                    const itemPrice = frame.calculatePrice(item.printSize,
                        item.frameStyle, item.frameWidth, item.matWidth)
                    document.getElementById("cart").appendChild(await createCartItem(item, itemPrice));
                    totalPrice += itemPrice;
                }

                document.getElementById("cart").appendChild(createTotal(totalPrice.toFixed(2)));
                document.getElementById("checkout-button").disabled = false;
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

        function getDescription(item) {
            let description = item.printSize === "L"  : (item.printSize === "M" ? "Medium" : "Small");
            description += " print in a " + item.frameWidth / 10 + " cm " + item.frameStyle + " frame";
            description += item.matWidth > 0 ? " with a " + item.matWidth / 10 + " cm " + item.matColor + " mat." ;
            return description;
        }

        async function createCartItem(item, price) {
            let newItem = document.createElement('div');
            newItem.setAttribute("id", item.objectID);
            newItem.setAttribute("class", "cart-item");

            let image = await getImage(item.objectID);
            let description = getDescription(item);

            const link = `config.html?objectID=${item.objectID}&frameWidth=${item.frameWidth}&matWidth=${item.matWidth}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&matColor=${item.matColor}`

            newItem.innerHTML =
                "        <div class=\"cart-preview\" id=\"preview-container-0\">\n" +
                "          <a href=\"" + link + "\">" +
                "            <img class=\"cart-thumb\" src=\"" + image.url + "\" id=\"preview-0\" alt=\"" + image.title + "\">\n" +
                "          </a>\n" +
                "        </div>\n" +
                "        <div class=\"museum-label\">\n" +
                "          <div>\n" +
                "            <span class=\"artist\">" + image.artist + "</span>\n" +
                "            <span class=\"title\">" + image.title + "</span>,\n" +
                "            <span class=\"date\">" + image.date + "</span>\n" +
                "            <br><br>\n" +
                "            <span class=\"frame-description\">" + description + "</span>\n" +
                "          </div>\n" +
                "          <div class=\"cart-price\">€ <span id=\"price-0\">" + price.toFixed(2) + "</span></div>\n" +
                "          <button name=\"remove\" class=\"cart-remove\"></button>\n" +
                "        </div>\n";

            newItem.getElementsByTagName("img")[0].onload = function (e) {
                frame.render(newItem.getElementsByTagName("img")[0],
                    newItem.getElementsByTagName("img")[0].parentElement.parentElement,
                    item.printSize,
                    item.frameStyle,
                    item.frameWidth,
                    item.matColor,
                    item.matWidth
                )
            };

            newItem.getElementsByTagName("button")[0].addEventListener("click", );

            return newItem;
        }

        

        (function () {
            // your page initialization code here
            // the DOM will be available here
            show();
        })();
    