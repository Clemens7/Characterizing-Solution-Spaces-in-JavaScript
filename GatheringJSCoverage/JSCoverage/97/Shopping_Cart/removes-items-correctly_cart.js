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

function insertFrame(cartSection, frame) {
    return __awaiter(this, void 0, void 0, function* () {
        const artwork = yield getArtwork(frame.objectID);
        let divCartItem = document.createElement('div');
        divCartItem.className = CLASS_CARTITEM;
        divCartItem.id = ID_PREFIX_ITEM + frame.objectID + "-" + frame.id;
        let divCartPreview = document.createElement('div');
        divCartPreview.id = `preview-container--${frame.objectID}-${frame.id}`;
        divCartPreview.className = 'cart-preview';
        let anchor = document.createElement('a');
        anchor.href = "" + frame.getConfiguratorURL();
        let img = document.createElement('img');
        img.className = 'cart-thumb';
        img.id = `preview--${frame.objectID}-${frame.id}`;
        img.onload = () => {
            render(img, divCartPreview, frame.printSize, frame.frameStyle, frame.frameWidth, frame.matColor, frame.matWidth);
        };
        anchor.appendChild(img);
        divCartPreview.appendChild(anchor);
        divCartItem.appendChild(divCartPreview);
        const divMuseumLabel = document.createElement('div');
        divMuseumLabel.className = 'museum-label';
        divMuseumLabel.innerHTML = `
        <div>
            <span class="artist">${artwork === null || artwork === void 0  : artwork.artist}</span>
            <span class="title">${artwork === null || artwork === void 0  : artwork.title}</span>,
            <span class="date">${artwork === null || artwork === void 0  : artwork.date}</span>
            <br><br>
            <span class="frame-description">${frame.getFrameDescription()}</span>
        </div>
        <div class="cart-price">€ <span id="price--${frame.objectID}-${frame.id}">${calculatePrice(frame.printSize, frame.frameStyle, frame.frameWidth, frame.matWidth)}</span></div>
    `;
        const button = document.createElement('button');
        button.onclick = removeFrame;
        button.dataset["id"] = String(frame.id);
        button.dataset["objectID"] = String(frame.objectID);
        button.className = "cart-remove";
        divMuseumLabel.appendChild(button);
        divCartItem.appendChild(divMuseumLabel);
        cartSection.insertBefore(divCartItem, cartSection.firstChild);
        // Image src must be set after everything has been added to DOM tree.
        // This will ensure that the render() method works properly (it uses offsetWidth, which will be wrong if the HTML elements haven't been added to DOM tree yet).
        img.src = "" + (artwork === null || artwork === void 0  : artwork.imageSrc);
    });
}
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
            while (cartItems.length > 0) {
                let cartItem = cartItems.item(0);
                if (cartItem !== null) {
                    cartItem.remove();
                }
            }
            // Remove any previously added noItemsSpan
            let noItemsSpan = document.getElementById(ID_NOITEMSSPAN);
            if (noItemsSpan !== null) {
                noItemsSpan.remove();
            }
            if (allFrames.length === 0) 
            else {
                for (const frame of allFrames) {
                    yield insertFrame(cartSection, frame);
                }
                setCheckoutButtonDisabled(false);
            }
        }
        updateTotalDOM();
    });
}
function removeFrame(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = event.target;
        const id = button.dataset["id"];
        const objectID = button.dataset["objectID"];
        let idNumber = id === undefined  : Number.parseInt(id);
        let objectIDNumber = objectID === undefined  : Number.parseInt(objectID);
        if (isNaN(idNumber)) {
            console.log("removeFrame received an ID that could not be parsed as a number! Trying to use objectID instead of id to remove the Frame.");
            if (isNaN(objectIDNumber)) 
            else {
                const configuredFrameRepository = new ConfiguredFrameRepository();
                configuredFrameRepository.removeFrameWithObjectID(objectIDNumber);
                yield updateFrameDOM();
            }
        }
    });
}
function updateTotalDOM() {
    const configuredFrameRepository = new ConfiguredFrameRepository();
    let totalPrice = 0;
    for (const configuredFrame of configuredFrameRepository.getAllFrames()) {
        totalPrice += calculatePrice(configuredFrame.printSize, configuredFrame.frameStyle, configuredFrame.frameWidth, configuredFrame.matWidth);
    }
    // Remove the total div, if it's already in DOM from a previous call to updateTotalDOM()
    let totalWrapper = document.getElementById(ID_PRICETOTAL);
    if (totalWrapper !== null) {
        totalWrapper.remove();
    }
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
        if (disabled === true) 
        else {
            checkoutButton.removeAttribute('disabled');
        }
    }
}
