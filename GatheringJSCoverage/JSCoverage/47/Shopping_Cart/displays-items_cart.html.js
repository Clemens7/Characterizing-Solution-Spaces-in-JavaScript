


        import {calculatePrice, render} from "./frame.js";

        // let localStorage = window.locallocalStorage;
        const wrapper = document.getElementById('cart');

        let sumTotal = 0;

        // const clearlocalStorage = document.createElement('button');
        // clearlocalStorage.innerText="lel gonbe";
        // wrapper.appendChild(clearlocalStorage);
        // clearlocalStorage.addEventListener('click', event => locallocalStorage.clear());

        const checkoutButton = document.getElementById('checkout-button');
        const total = document.getElementById('price-total');
        const empty = document.createElement('h1');
        empty.innerHTML = 'There are no items in your shopping cart. <br><br>';
        const cartLink = document.getElementById('cart-link');
        const objectAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';


        // const test = [{
        //     objectID: 400,
        //     printSize: 'L',
        //     frameWidth: 27,
        //     frameStyle: 'classic',
        //     matWidth: 31,
        //     matColor: 'indigo'
        // }];
        //
        // localStorage.setItem('cart', JSON.stringify(test));


        checkoutButton.addEventListener('click', );

        document.addEventListener('DOMContentLoaded', event => {

            if (!isEmpty()) {
                showItems();
            }

        });

        // function checkDuplicates(imgID) {
        //     let cart = JSON.parse(localStorage.getItem('cart'));
        //     if (cart == null)
        //         return false;
        //     for (let img of cart) {
        //         if (img.objectID === imgID) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        function isEmpty() {
            console.log(JSON.parse(localStorage.getItem('cart')));
            if (localStorage.getItem('cart') == null || JSON.parse(localStorage.getItem('cart')).length === 0) 
            return false;
        }

        // function getParameterByName(name) {
        //     const url = window.location.href;
        //     name = name.replace(/[\[\]]/g, '\\$&');
        //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        //         results = regex.exec(url);
        //     if (!results) return null;
        //     if (!results[2]) return '';
        //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
        // }

        async function getImageObject(imgID) {
            let picture = JSON.parse(localStorage.getItem(imgID));

            if (!picture) {
                let response = await fetch(objectAPI + imgID);
                picture = await response.json();

                localStorage.setItem(imgID, JSON.stringify(picture));
            }
            return picture;
        }

        // function addItem(img) {
        //     console.log(img);
        //     if (localStorage.getItem('cart') === null) {
        //         localStorage.setItem('cart', JSON.stringify([img]));
        //     } else {
        //         let cart = JSON.parse(localStorage.getItem('cart'));
        //         cart.push(img);
        //         localStorage.setItem('cart', JSON.stringify(cart));
        //     }
        // }

        async function showItems() {
            const currentCart = JSON.parse(localStorage.getItem('cart'));
            cartLink.innerText = "Cart (" + currentCart.length + ")"
            for (let object of currentCart) {

                let img = await getImageObject(object.objectID);

                console.log(object.printSize);
                console.log(object.frameStyle);
                console.log(object.frameWidth);
                console.log(object.matWidth);
                let imgPrice = calculatePrice(object.printSize, object.frameStyle, object.frameWidth, object.matWidth);
                sumTotal += imgPrice;
                total.textContent = sumTotal.toFixed(2) + "";

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                const picture = document.createElement('img');
                picture.className = "cart-thumb";
                picture.setAttribute("src", img.primaryImageSmall);
                picture.setAttribute("id", "preview-" + img.objectID);

                const preview = document.createElement('div');
                preview.className = "cart-preview";
                preview.setAttribute("id", "preview-container-" + img.objectID);

                picture.addEventListener('load', () => render(picture, preview, object.printSize, object.frameStyle, object.frameWidth, object.matColor, object.matWidth));

                const link = document.createElement('a');
                link.setAttribute("href", "config.html?objectID=" + img.objectID + "&printSize=" + object.printSize + "&frameStyle=" + object.frameStyle + "&frameWidth=" + object.frameWidth + "&matColor=" + object.matColor + "&matWidth=" + object.matWidth);

                link.appendChild(picture);
                preview.appendChild(link);
                cartItem.appendChild(preview);

                const label = document.createElement('div');
                label.className = 'museum-label';
                label.innerHTML = `<div class="cart-price">€ <span id="price-${img.objectID}">${imgPrice.toFixed(2)}</span></div>`;

                const info = document.createElement('div');
                info.innerHTML = `
                    <span class="artist">${img.artistDisplayName}</span>
                    <span class="title">${img.title}</span>,
                    <span class="date">${img.objectDate}</span>
                    <br><br>`;

                let pSize = "";
                if (object.printSize == "S")
                    pSize = "Small";
                else if (object.printSize == "M")
                    pSize = "Medium";

                let descr = pSize + " print in a " + object.frameWidth/10 + " cm " + object.frameStyle + " frame";
                if (object.matWidth != 0)
                    descr += " with a " + object.matWidth/10 + " cm " + object.matColor + " mat";
                descr += ".";

                const description = document.createElement('span');
                description.className = "frame-description";
                description.innerText = descr;
                info.appendChild(description);
                label.insertBefore(info, label.firstChild);

                console.log(description.innerText);


                const removeButton = document.createElement('button');
                removeButton.className = 'cart-remove';
                removeButton.onclick = ;

                label.appendChild(removeButton);
                cartItem.appendChild(label);
                wrapper.insertBefore(cartItem, wrapper.firstChild);

            }
        }

        

        

    