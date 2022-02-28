import * as fr from './frame.js'
import * as ac from './artwork-cache.js'
import * as NavigationBar from './navigation-bar.js';

const itemTemplate = {
    cartItem: '<div class="cart-item"></div>',
    preview: '<div class="cart-preview"></div>',
    link: '<a href=""></a>',
    img: '<img class="cart-thumb" src="" id="preview-" alt="">',
}

export function createNodeFromHTMLString(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function createPreviewLink(item) {
    return `config.html?objectID=${item['objectID']}&printSize=${item['printSize']}&frameStyle=${item['frameStyle']}&frameWidth=${item['frameWidth']}&matColor=${item['matColor']}&matWidth=${item['matWidth']}`;
}

async function fetchArtwork(item) {
    let rawArtwork = ac.retrieve(item['objectID']);
    let artwork;
    if (rawArtwork)  else {
        //fetch artwork from met API and store it to artwork cache
        const serverResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item['objectID']}`);
        rawArtwork = await serverResponse.json();
        //TODO: second parameter (artwork['primaryImage']) is actually not the right one per
        //default here further seperation between different artworks is necessary
        artwork = new Artwork(rawArtwork['objectID'], rawArtwork['primaryImageSmall'], rawArtwork['artistDisplayName'], rawArtwork['title'], rawArtwork['objectDate']);
        ac.store(artwork['id'], artwork);
    }
    return artwork;
}

/**
 * creates a html element for cart entry
 * @param item the html element should be created from
 */
async function createCartItemNode(item) {
    //fetch artwork

    let artwork = await fetchArtwork(item);
    let cartItem = {
        cartItem: `<div class="cart-item" id="cart-item-${artwork['id']}"></div>`,
        preview: `<div class="cart-preview" id="preview-container-${artwork['id']}"></div>`,
        link: `<a href="${createPreviewLink(item)}"></a>`,
        img: `<img class="cart-thumb" src="${artwork['image']}" id="preview-${artwork['id']}" alt="${artwork['title']}">`
    };

    let nodeItem = createNodeFromHTMLString(cartItem.cartItem);
    nodeItem.id = `cart-item-${artwork['id']}`;
    let nodePreview = createNodeFromHTMLString(cartItem.preview);
    let nodeLink = createNodeFromHTMLString(cartItem.link);
    let printSize;
    let nodeImage = createNodeFromHTMLString(cartItem.img);
    nodeImage.onload = function () {

        fr.render(nodeImage, nodePreview, item['printSize'], item['frameStyle'],
            item['frameWidth'] * 10, item['matColor'], item['matWidth'] * 10);
    };
    nodeLink.appendChild(nodeImage);
    nodePreview.appendChild(nodeLink);
    nodeItem.appendChild(nodePreview);


    let labelTemplate =
        `    <div class="museum-label">\n` +
        `      <div>\n` +
        `        <span class="artist">${artwork['artist']}</span>\n` +
        `        <span class="title">${artwork['title']}</span>,\n` +
        `        <span class="date">${artwork['date']}</span>\n` +
        `        <br><br>\n` +
        `        <span class="frame-description" id="frame-description-${item['objectID']}"></span>\n` +
        `      </div>\n` +
        `      <div class="cart-price">€ ${fr.calculatePrice(item['printSize'], item['frameStyle'], item['frameWidth'], item['matWidth'])}<span id="price-"></span></div>\n` +
        `    </div>`;
    let removeButtonTemplate = `<button class="cart-remove" id="remove-button-${item['objectID']}"></button>`;
    let removeButtonNode = createNodeFromHTMLString(removeButtonTemplate);
    removeButtonNode.addEventListener('click', );
    let museumLabelNode = createNodeFromHTMLString(labelTemplate);
    museumLabelNode.appendChild(removeButtonNode);


    nodeItem.appendChild(museumLabelNode);

    return nodeItem;
}


window.onload = function () {

    displayCart();

    //TODO:remove following is just for testing!
    async function displayCart() {
        await NavigationBar.displayCartSize();
        let cart = await getCart();
        if (cart.length !== 0) {
            //TODO: display cart items
            let item;
            while (cart.length !== 0) {
                item = cart.shift();
                console.log(item);
                appendCartItemToPage(item);
            }
            //enable checkout button
           let button  =  document.getElementById('checkout-button');
           button.disabled = false;
           button.onclick =
               

        }

        /**
         * ADDED FROM DIANA - TESTING
         */
        displayTotalCosts();
    }
};


/**
 * appends an item to the page/document
 * @param item that has to be appended
 */
async function appendCartItemToPage(item = null) {
    if (item === null) 

    let cartItemNode = await createCartItemNode(item);
    let cartContainer = document.getElementById('cart');
    //append put new html item above current first item
    cartContainer.prepend(cartItemNode);
    let removeButton = document.getElementById(`remove-button-${item['objectID']}`);
    /* removeButton.addEventListener('click', ev => {
         newRemoveCartItem(removeButton, item['objectID']);
     });*/

    let size;
    switch (item['printSize']) {
        case 'S':
            size = 'Small';
            break;
        
        case 'L':
            size = 'Large';
            break;
        
    }

    if (item['matWidth'] === 0)  else {
        document.getElementById(`frame-description-${item['objectID']}`).textContent = `${size} print in a ${item['frameWidth'] / 10} cm ${item['frameStyle']} frame with a ${item['matWidth'] / 10} cm ${item['matColor']} mat.`;

    }

}



/**
 * adds a valid item consisting of the given parameters to the cart
 * @param objectID of the item to add
 * @param printSize of the item to add
 * @param frameStyle of the item to add
 * @param frameWidth of the item to add
 * @param matColor of the item to add
 * @param matWidth of the item to add
 * @returns true if the item was added successfully, otherwise false;
 */
export 


/**
 * removes item with given objectID from cart
 * @param objectID of the element that should be removed
 */


/**
 * returns list of current cart items if there are any, otherwise returns empty list
 * @returns {CartItem[]|{}}
 */
export async function getCart() {
    let cart = localStorage.getItem('cart');
    //return empty list if no cart items are stored
    if (cart === null) 
    //convert objects from type any to type CartItem before returning them
    cart = await JSON.parse(cart);
    cart = cart.map(item => {
        return new CartItem(item['objectID'],
            item['printSize'],
            item['frameStyle'],
            item['frameWidth'],
            item['matColor'],
            item['matWidth']);
    });
    return cart;
}

/**
 * stores current cart to local storage
 * @param cart that should be saved
 */


/*===================================================DIANA'S CODE===================================================*/


/**
 * gets size of cart
 * @returns {number} size of cart
 */
export async function cartSize() {
    const cart = await getCart();
    return cart.length;
}

/*
async function displayCart() {
    displayTotalCosts();
}
*/

/**
 * gets total cost
 */
export async function getTotalCosts() {
    const cart = await getCart();
    let item;
    let totalCosts = 0;
    console.log('cartSIZE');
    console.log(cart.length);
    for (let i = 0; i < cart.length; i++) {
        item = cart[i];
        console.log('=========');
        console.log('ITEM');
        console.log(item);
        console.log('=========');
        console.log('ITEM costs');
        console.log(getCost(item));
        console.log('=========');
        console.log('CURR TOTAL COSTS');
        totalCosts += parseFloat(getCost(item));
        console.log(totalCosts);
    }
    return totalCosts.toFixed(2);
}

async function displayTotalCosts() {
    const totalCosts = await getTotalCosts();
    let htmlTemplateElementCart = document.getElementById('price-total');
    if (totalCosts > 0) {
        htmlTemplateElementCart.innerHTML = totalCosts;
        htmlTemplateElementCart.innerText = totalCosts;
    }
}

function getCost(item) {
    return fr.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
}

/*===================================================DIANA'S CODE END==================================================*/
/**
 * encapsulates cart item params
 */
class CartItem {
    constructor(objectID, printSize, frameStyle,
                frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}

/**
 * encapsulates artworks
 */
class Artwork {
    constructor(id, image, artist, title, date) {
        this.id = id;
        this.image = image;
        this.artist = artist;
        this.title = title;
        this.date = date;
    }
}

