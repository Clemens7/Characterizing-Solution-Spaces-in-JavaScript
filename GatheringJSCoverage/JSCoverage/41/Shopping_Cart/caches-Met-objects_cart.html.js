
    import * as CartCache from './cartCache.js';
    import { ItemDocumentContainer } from './met-dom.js';
    import * as MetAPI from './metAPI.js';
    import * as Frame from './frame.js';
		import * as cartLinkHelper from './cartLinkHelper.js';

    let itemContainer = new ItemDocumentContainer("cart");

    

    async function retrieveCart() {
      const items = await CartCache.retrieveAll();
      if (!items || items.length < 1) 

      /* items now is a list of the items in the cart
       * e.g. one item
       * {
       *   "objectID":"1",
       *   "printSize":"22",
       *   "frameStyle":"style1",
       *   "frameWidth":"5",
       *   "matColor":"blue",
       *   "matWidth":"3"
       * }
       * python3 -m http.server
       */
      itemContainer.clear();

      let i = 0;
      let totalPrice = 0;
      for (let item of items) {
        let img = await MetAPI.retrieveObj(item.objectID);
        totalPrice = totalPrice + itemContainer.addCartItemToDocument(item, img, i);

        Frame.render(document.getElementById("object-image-" + i),
          document.getElementById("preview-container-" + i),
          item.printSize,
          item.frameStyle,
          item.frameWidth,
          item.matColor,
          item.matWidth);

        document.getElementById("" + i).addEventListener("click", );

        i = i + 1;
      }
      itemContainer.addCartCheckout(totalPrice);

    }

    document.addEventListener('DOMContentLoaded', event => {
      retrieveCart();
    });

		cartLinkHelper.updateCartLink();
  