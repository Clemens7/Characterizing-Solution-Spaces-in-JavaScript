

        let price = 0;

        import * as frame from "./frame.js";
        import * as cache from "./localStorageCahe.js";
        import {CartPicture} from "./localStorage.js";
        import {Picture} from "./localStorage.js";


        document.addEventListener('DOMContentLoaded', event => {
          if (cache.cartSize() === 0)  else {
            retrieveBuffer();
          }
        });

        async function retrievePictures(id) {
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
            const response = await fetch(url);
            const rawData = await response.json();
            const picture = new Picture(rawData.primaryImageSmall, rawData.title, rawData.artistDisplayName, rawData.objectDate, rawData.dimensions);
            cache.store(id, picture);
            return picture;
        }

        async function retrieveBuffer() {

            //if(previewPicture==null || typeof(previewPicture)==='undefined'){
            //previewPicture=   await checkId(previewPictureId);
            let elems = cache.retrieve("cart");
            let parent = document.getElementById("cart");

            let index = 0;
            for (let elem of elems) {
                let container = document.createElement("div");
                container.className = "cart-item";
                container.id = "object-" + elem.objectID;
                let pic = cache.retrieve(elem.objectID);
                if (!pic) {
                    pic = await retrievePictures(elem.objectID);
                }
                let img = document.createElement("img");
                img.src = `${pic.image}`;
                img.id = `preview-${index}`;
                img.class = `cart-thumb`;
                let hr = document.createElement("a");
                hr.href = `./config.html?objectID=${elem.objectID}&printSize=${elem.printSize}&frameStyle=${elem.frameStyle}&frameWidth=${elem.frameWidth}&matColor=${elem.matColor}&matWidth=${elem.matWidth}`;
                hr.appendChild(img);
                let item = document.createElement("div");
                item.class = "cart-preview";
                item.id = `preview-container-${index}`;
                item.appendChild(hr);
                container.appendChild(item);
                price += frame.calculatePrice(elem.printSize, elem.frameStyle, elem.frameWidth, elem.matWidth);


                container.innerHTML += `<div class="museum-label">
                  <div>
                    <span class="artist">${pic.artist}</span>
                    <span class="title">${pic.title}</span>,
                    <span class="date">${pic.date}</span>
                    <br><br>
                    <span class="frame-description">${genDescription(elem.printSize, elem.frameStyle, elem.frameWidth, elem.matWidth, elem.matColor)}</span>
                  </div>
                  <div class="cart-price">€ <span id="price-${elem.objectID}">${frame.calculatePrice(elem.printSize, elem.frameStyle, elem.frameWidth, elem.matWidth)}</span></div>
                  <button class="cart-remove" onclick="remove(${elem.objectID})"></button>
                </div>`;
                //<button class="cart-remove" id="${elem.objectID}"></button>

                parent.prepend(container);
                //container = document.getElementById(`preview-container-${index}`);
                //frame.render(document.getElementById(`preview-${index}`), document.getElementById(`preview-container-${index}`), elem.printSize, elem.frameStyle, elem.frameWidth, elem.matColor, elem.matWidth);
                //console.log(document.getElementById(`preview-${index}`), document.getElementById(`preview-container-${index}`), elem.printSize, elem.frameStyle, elem.frameWidth, elem.matColor, elem.matWidth);
                //img.addEventListener("load", event => {frame.render(img, container, elem.printSize, elem.frameStyle, elem.frameWidth, elem.matColor, elem.matWidth);});
                if (img.complete)
                    
                index++;
            }

            /*document.querySelectorAll('.cart-remove').forEach(item => {
                item.addEventListener('click', event => {
                    cache.removeFromCart(item.id);
                    price -= Number(document.getElementById("price-" + item.id).innerText);
                    cache.cartSize() === 0 ? displayNoItemsMessage() : setTotalPrice();
                    setCartNumber();
                    document.getElementById("object-" + item.id).remove();
                })
            });*/


            setTotalPrice();
            setCartNumber();
        }

        window.remove = remove;
        

        function setTotalPrice() {
          document.getElementById("price-total").innerHTML = price.toFixed(2);
        }

        function setCartNumber() {
          document.getElementById("cart-link").innerHTML = `Cart`;
          if (cache.cartSize() !== 0) {
            document.getElementById("cart-link").innerHTML = `Cart (${cache.cartSize()})`;
          }
        }

        

        document.getElementById("checkout-button").addEventListener("click", );

        function genDescription(printSize, frameStyle, frameWidth, matWidth, matColor) {
            frameWidth = frameWidth / 10;
            matWidth = matWidth / 10;
            let description;

            switch(printSize){
                case "S" : description = "Small";
                    break;
                
                case "L" : description = "Large";
                    break;
            }

            description += " print in a " + frameWidth + " cm " + frameStyle + " frame";

            if (matWidth != 0)
                description += " with a " + matWidth + " cm " + matColor + " mat";

            return description += ".";
        }


    