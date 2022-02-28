import * as Frame from './frame.js';
import * as Cache from './cache.js';

/**
 * Generates the thumbnail with label for the given art-object and appends it to the container
 * @param object    The Metropolitan Museum of Art Collection API object for which to generate the thumbnail for
 * @param container The parent (DOM) element to append the generated thumbnail to. Must not be null.
 * */
export 

/**
 *  Generates the label for the given art-object and appends it to the container 
 * @param object    The Metropolitan Museum of Art Collection API object for which to generate the label for
 * @param container The parent (DOM) element to append the generated label to. Must not be null.
 * */
export 


export 



export function showEmptyCart(container) {

    let toRemove = document.getElementsByClassName('price')[0];
    toRemove.remove();
    const emptycart = "There are no items in your shopping cart.";

    let textNode = document.createElement("h2");
    textNode.innerText = emptycart;
    container.insertBefore(textNode, container.childNodes[0]);
    document.getElementById('checkout-button').disabled = true;
}
