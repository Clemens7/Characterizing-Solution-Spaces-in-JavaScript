var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConfiguredFrameRepository } from "./repository/ConfiguredFrameRepository.js";
import { getArtwork } from "./artwork-api.js";
import { calculatePrice, render } from "./frame.js";
import { updateCartCounter } from "./cart-counter.js";
const ID_CARTSECTION = 'cart';
const ID_PREFIX_ITEM = 'cart-item--';
const CLASS_CARTTOTAL = 'cart-total';
const ID_PRICETOTAL = 'price-total-wrapper';
const ID_CHECKOUTBUTTON = 'checkout-button';
const ID_NOITEMSSPAN = 'no-items';
const CLASS_CARTITEM = "cart-item";
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: remove this once config.html and cart.html is implemented
    //    insertDummyFramesIntoLocalStorage();
    yield updateFrameDOM();
}));


function updateFrameDOM() {
    return __awaiter(this, void 0, void 0, function* () {
        updateCartCounter();
        let configuredFrameRepository = new ConfiguredFrameRepository();
        let allFrames = configuredFrameRepository.getAllFrames();
        // Frames are stored with the newest one at the end. However, the assignment specifies "Display the most recently added item on top.".
        allFrames = allFrames.reverse();
        let cartSection = document.getElementById(ID_CARTSECTION);
        if (cartSection !== null) {
            // Remove all previously added cart items
            let cartItems = document.getElementsByClassName(CLASS_CARTITEM);
            while (cartItems.length > 0) 
            // Remove any previously added noItemsSpan
            let noItemsSpan = document.getElementById(ID_NOITEMSSPAN);
            if (noItemsSpan !== null) {
                noItemsSpan.remove();
            }
            if (allFrames.length === 0) {
                let span = document.createElement('span');
                span.id = ID_NOITEMSSPAN;
                span.innerText = "There are no items in your shopping cart.";
                cartSection.insertBefore(span, cartSection.firstChild);
                setCheckoutButtonDisabled(true);
            }
        }
        updateTotalDOM();
    });
}

function updateTotalDOM() {
    const configuredFrameRepository = new ConfiguredFrameRepository();
    let totalPrice = 0;
    for (const configuredFrame of configuredFrameRepository.getAllFrames()) 
    // Remove the total div, if it's already in DOM from a previous call to updateTotalDOM()
    let totalWrapper = document.getElementById(ID_PRICETOTAL);
    if (totalWrapper !== null) 
    // Add the total DOM to DOM tree
    totalWrapper = document.createElement('div');
    totalWrapper.id = ID_PRICETOTAL;
    totalWrapper.className = 'price';
    totalWrapper.innerHTML = `Total: € <span id="price-total">${totalPrice}</span>`;
    let cartTotalDivs = document.getElementsByClassName(CLASS_CARTTOTAL);
    for (let i = 0; i < cartTotalDivs.length; i++) {
        const div = cartTotalDivs.item(i);
        if (div !== null) {
            div.insertBefore(totalWrapper, div.firstChild);
        }
    }
}
function setCheckoutButtonDisabled(disabled) {
    const checkoutButton = document.getElementById(ID_CHECKOUTBUTTON);
    if (checkoutButton !== null) {
        if (disabled === true) {
            checkoutButton.setAttribute('disabled', '');
        }
    }
}
