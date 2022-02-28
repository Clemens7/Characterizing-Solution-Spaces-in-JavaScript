

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

                if (cartString === null || cartString === "[]") 
                const cart = JSON.parse(cartString);
                document.getElementById('cart-link').innerText = `Cart (${cart.length})`;
                const priceTag = document.getElementById('price-total');

                let price = 0.0;
                let i = 0;
                for (let item of cart) {
                    const itemPrice = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
                    price += itemPrice;
                    const toAdd = await getItem(item, i, itemPrice);
                    cartTag.insertBefore(toAdd, checkoutElement);
                    i++;
                }
            
                priceTag.innerText = price;
            }

            async function getItem(item, i, price) {

                const data = await Config.loadObject(item.objectID);

                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                const cartPreview = document.createElement("div");
                cartPreview.className = "cart-preview";
                cartPreview.id = "preview-container-" + i;
                const a = document.createElement("a");
                a.href = "config.html?" +
                    `objectID=${item.objectID}&` +
                    `printSize=${item.printSize}&` +
                    `frameStyle=${item.frameStyle}&` +
                    `frameWidth=${item.frameWidth}&` +
                    `matColor=${item.matColor}&` +
                    `matWidth=${item.matWidth}`;
                const img = document.createElement("img");
                img.className = "cart-thumb";
                img.id = "preview-" + i;
                // img.src = data.primaryImageSmall;//primaryImage;
                img.alt = data.title;
                const unfinishedImg = new Image();
                unfinishedImg.onload = function () {
                    img.src = this.src;
                };
                unfinishedImg.src = data.primaryImageSmall;
                a.appendChild(img);
                cartPreview.appendChild(a);
                cartItem.appendChild(cartPreview);

                const museumLabel = document.createElement("div");
                museumLabel.className = "museum-label";

                const labelItems = document.createElement("div");

                const spanArtist = document.createElement("span");
                const spanTitle = document.createElement("span");
                const spanDate = document.createElement("span");
                spanArtist.className = "artist";
                spanArtist.innerText = data.artistDisplayName;
                spanTitle.className = "title";
                spanTitle.innerText = data.title;
                spanDate.className = "date";
                spanDate.innerText = data.objectDate;
                labelItems.appendChild(spanArtist);
                labelItems.appendChild(spanTitle);
                labelItems.appendChild(document.createTextNode(", "));
                labelItems.appendChild(spanDate);

                const br1 = document.createElement("br");
                const br2 = document.createElement("br");

                labelItems.appendChild(br1);
                labelItems.appendChild(br2);

                const spanFrame = document.createElement("span");
                spanFrame.className = "frame-description";
                spanFrame.innerText = configDescription(item);
                labelItems.appendChild(spanFrame);

                museumLabel.appendChild(labelItems);

                const cartPrice = document.createElement("div");
                cartPrice.className = "cart-price";

                const spanPrice = document.createElement("span");
                spanPrice.id = "price-" + i;
                spanPrice.innerText = price;
                cartPrice.appendChild(document.createTextNode("€ "));
                cartPrice.appendChild(spanPrice);

                museumLabel.appendChild(cartPrice);

                const button = document.createElement("button");
                button.className = "cart-remove";


                button.addEventListener("click", );

                museumLabel.appendChild(button);

                cartItem.appendChild(museumLabel);

                return cartItem;

            }

            function configDescription(config) {
                const sizeName = {
                    S: 'Small',
                    M: 'Medium',
                    L: 'Large'
                }

                return `${sizeName[config.printSize]} print` +
                    ` in a ${config.frameWidth / 10} cm` +
                    ` ${config.frameStyle} frame` +
                    (config.matWidth > 0
                        ? ` with a ${config.matWidth / 10} cm ${config.matColor} mat.`
                        
                    )
            }

            

            
        