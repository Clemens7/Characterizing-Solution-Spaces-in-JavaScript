
    import { CartDocumentContainer } from './dom-helpers.js';
    import { FramedPicture } from './config.js';
    const cartDocumentContainer = new CartDocumentContainer();
    (async () => {
      try {
        await cartDocumentContainer.displayCartItems();
        await getNumberOfCartItems();
        const removeButtons = document.querySelectorAll('.cart-remove');
        removeButtons.forEach();
      } 
    })();


    async function getNumberOfCartItems() {
       let items = await FramedPicture.loadFromLocalStorage();
       if (items.length>0)else{
         document.getElementById('cart-link').innerText = "Cart";
       }

    }
    document.getElementById('checkout-button').onclick = ;
  