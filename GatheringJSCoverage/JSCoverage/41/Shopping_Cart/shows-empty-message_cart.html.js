
    import * as CartCache from './cartCache.js';
    import { ItemDocumentContainer } from './met-dom.js';
    import * as MetAPI from './metAPI.js';
    import * as Frame from './frame.js';
		import * as cartLinkHelper from './cartLinkHelper.js';

    let itemContainer = new ItemDocumentContainer("cart");

    

    async function retrieveCart() {
      const items = await CartCache.retrieveAll();
      if (!items ) {
        itemContainer.clear();
        itemContainer.addNoItemText();
        itemContainer.addCartCheckout(0);
        document.getElementById("checkout-button").disabled = true;
        return;
      }}

    document.addEventListener('DOMContentLoaded', event => {
      retrieveCart();
    });

		cartLinkHelper.updateCartLink();
  