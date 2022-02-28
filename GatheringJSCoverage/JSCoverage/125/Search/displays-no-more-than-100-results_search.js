import {updateHeaderCartItemCount} from "./cart-dom.js";
import * as SearchCache from "./search-cache.js";
import * as ArtAPI from "./art-api.js";

// TODO: remove test buttons

document.getElementById('test-add').addEventListener('click', );
document.getElementById('test-clear').addEventListener('click', );
document.getElementById('test-update').addEventListener('click', );

/*
 * Page modification
 */
//document.addEventListener('DOMContentLoaded', () => preparePageUpdate());
document.addEventListener('DOMContentLoaded', () => updatePage());

var count = parseInt(localStorage['count'] || '0', 10);
var msg = "Placeholder";


// objectID,primaryImageSmall,title,artistDisplayName,objectDate


submitSearch();

async function submitSearch() {
    const form= document.querySelector('*');
    const cart = document.getElementById('gallery')

    form.addEventListener('submit',)

}

function updatePage() {
    updateHeaderCartItemCount();
    updateSearchCart();
}





function updateSearchCart() {
    const cart = document.getElementById('gallery')
    if (cart) {
        const cartContent = SearchCache.getSearchCartContent();
        console.log("Going into update SearchCart")
        // Find items
        let cartItems;
        cartItems = Array.from(cart.getElementsByClassName('thumb'));
        for (const item of cartContent) 

    }
}








