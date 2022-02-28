


        import {Cart, CartItem, CartContainer} from './cart.js';

        /*
            const mockData = [
              new CartItem(39799, 'M', 'natural', 33, 'mint', 17),
              new CartItem(459055, 'S', 'classic', 50, '', 0)
            ];

            Cart.clear();
            for(let data of mockData){
              Cart.save(data);
            }
            */

        function generateCartElements() {
            const cartContainer = new CartContainer('cart');
            cartContainer.clear();
            let items = Cart.getItems();
            for (let i = 0; i < items.length; i++) {
                cartContainer.addItemToCart(items[i], i);
            }
        }

        document.addEventListener('DOMContentLoaded', event => {
            generateCartElements();
            Cart.updateCartItemCounter();
        });

    