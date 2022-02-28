import * as DOM from '../helpers/dom.js';
import {getConfigurationList} from '../cart/storage.js';
import {calculateConfigPrice} from "../../frame.js";
import {renderConfig} from "../../frame.js";
import {getArtworksByIdListAsync} from "../metmuseum/museum-api.js";
import {removeConfiguration} from "./storage.js";





function calcTotalPriceOfItems(configs) {
    return configs.reduce(, 0);
}

function updateTotalPrice() {
    const items = getConfigurationList();
    document.getElementById("price-total").textContent = calcTotalPriceOfItems(items).toFixed(2);
}






function showEmptyMessage() {
    const emptyText = document.createElement("div");
    emptyText.id = "emptyText";
    emptyText.textContent = "There are no items in your shopping cart.";
    document.getElementById("cart").insertAdjacentElement('afterbegin', emptyText);
    document.getElementById("checkout-button").disabled = true;
}



function initCartItems() {
    const items = getConfigurationList();
    if (items.length === 0) {
        showEmptyMessage();
    }
    //update total price
    updateTotalPrice();
}

function init(){
    document.getElementById("checkout-button").onclick = ;
    initCartItems();
}
DOM.onReady(init);