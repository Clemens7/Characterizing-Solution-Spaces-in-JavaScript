
    import { CartDocumentContainer } from './dom-helpers.js';
    import { FramedPicture } from './config.js';
    const cartDocumentContainer = new CartDocumentContainer();
    (async () => {
      try {
        await cartDocumentContainer.displayCartItems();
        await getNumberOfCartItems();
        const removeButtons = document.querySelectorAll('.cart-remove');
        removeButtons.forEach(function (b){
          b.addEventListener('click', () => {
              const re = 'remove-';
              const id = b.id.replace(re, '');
              cartDocumentContainer.deleteFromCart(id);
              b.parentNode.parentNode.parentNode.removeChild(b.parentNode.parentNode);
              getNumberOfCartItems();
              cartDocumentContainer.updatePriceTagAndCart();
              cartDocumentContainer.updateItemIDs();
          })
        });
      } 
    })();


    async function getNumberOfCartItems() {
       let items = await FramedPicture.loadFromLocalStorage();
       if (items.length>0){
       document.getElementById('cart-link').innerText = "Cart (" + await items.length +")";
       }

    }
    document.getElementById('checkout-button').onclick = ;
  