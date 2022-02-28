import { calculatePrice, render } from './frame.js'

/**
 * Executes functions on page load.
 */
function pageLoad() {
    storeConfiguration();
    setCartNumber();
    addItemsFromCart();
    const prices = calculateItemPrices(getCartStorage());
    setTotalCartPrice(prices);
    addOnclickEventHandlerToCheckout();
}

/**
 * Stores the configuration of the artwork including the objectID.
 */
function storeConfiguration() {
    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('object-id');
    const matWidth = urlParams.get('matWidth');
    const frameWidth = urlParams.get('frameWidth');
    const frameStyle = urlParams.get('frameStyle');
    const matColor = urlParams.get('matColor');
    const printSize = urlParams.get('printSize');

    window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${window.location.hash}`,
    );
    
    // if cart is not called from config page no storing of data needed
    if (!objectID ) return;
}

/**
 * Adds an div with the 'cart-item' class for every item in the shopping cart.
 */
function addItemsFromCart() {
    let cartStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    let cart = JSON.parse(cartStorage);

    if (cart == null || cart.length === 0)  else {
        createCartItems(cart);
    }
}

/**
 * Create all items in the cart and append it to the section.
 *
 * @param cart contains all cart-items and their configurations
 */
async function createCartItems(cart) {
    let section = document.getElementById('cart');
    let lastNode = document.getElementById('cart-total');
    let newNode;

    const prices = calculateItemPrices(cart);

    for (let item of cart) {
        newNode = await createCartItemNode(item);
        section.insertBefore(newNode, lastNode);
        lastNode = newNode;
        setItemPrice(prices, item.objectID);
        addRemoveEventHandler(cart, item.objectID);
    }
}

/**
 * Creates an cart-item {HTMLElement} that contains its needed information
 *
 * @param item the cart-item to create
 * @returns 
 */
async function createCartItemNode(item) {
    let objectData = await getObjectData(item.objectID);

    let cartItem = createElementNodeWithAttributes('div', {'class': 'cart-item'});
    let cartPreview = createElementNodeWithAttributes('div',
        {'class': 'cart-preview', 'id': `preview-container-${item.objectID}`}
    );
    let anchor = createElementNodeWithAttributes('a', {'href': `${createLinkToConfigurator(item)}`});
    let image = createElementNodeWithAttributes(
        'img',
        {'class': 'cart-thumb', 'src': `${objectData['primaryImageSmall']}`, 'id': `preview-${item.objectID}`, 'alt': `Image: ${objectData['title']}`}
    );

    image.addEventListener('load', () => {
        renderItemImage(item);
    });

    anchor.appendChild(image);
    cartPreview.appendChild(anchor);

    let museumLabel = createElementNodeWithAttributes('div', {'class': 'museum-label'});
    let infoDiv = createElementNodeWithAttributes('div');
    let artistSpan =  createElementNodeWithAttributes('span', {'class': 'artist'});
    artistSpan.innerHTML = `${objectData['artistDisplayName']}`;
    let titleSpan = createElementNodeWithAttributes('span', {'class': 'title'});
    titleSpan.innerHTML = `${objectData['title']}, `;
    let dateSpan = createElementNodeWithAttributes('span', {'class': 'date'});
    dateSpan.innerHTML = `${objectData['objectDate']}`;
    let br1 = createElementNodeWithAttributes('br');
    let br2 = createElementNodeWithAttributes('br');
    let descriptionSpan = createElementNodeWithAttributes('span', {'class': 'frame-description'});
    descriptionSpan.innerHTML = createDescription(item);

    infoDiv = appendChildNodes(infoDiv, [artistSpan, titleSpan, dateSpan, br1,  br2, descriptionSpan]);

    let cartPrice = createElementNodeWithAttributes('div', {'class': 'cart-price'});
    let priceSpan = createElementNodeWithAttributes('span', {'id': `price-${item.objectID}`});
    priceSpan.innerHTML = '0';
    let euroSign = document.createTextNode('€ ');
    cartPrice = appendChildNodes(cartPrice, [euroSign, priceSpan]);

    let cartRemoveButton = createElementNodeWithAttributes('button', {'class': 'cart-remove', 'name': 'cart-remove', 'id': item.objectID});

    museumLabel = appendChildNodes(museumLabel, [infoDiv, cartPrice, cartRemoveButton]);
    cartItem = appendChildNodes(cartItem, [cartPreview, museumLabel]);

    return Promise.resolve(cartItem);
}


/**
 *
 * @returns {Promise<*>}
 */
function getObjectData(objectID) {
    let objectData;

    const fetchObject = ;

    const cachedJson = localStorage.getItem(`object-${objectID}`);
    if (cachedJson != null) {
        objectData = Promise.resolve(JSON.parse(cachedJson));
    }
    return objectData;
}


/**
 *
 * @param item
 * @returns {string}
 */
function createDescription(item) {
    let size = {'S': 'Small', 'M': 'Medium', 'L':'Large'};
    let description = `${size[item.printSize]} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame`;

    if (item.matWidth != 0) {
        description += ` with a ${item.matWidth / 10} cm ${item.matColor} mat.`;
    }

    return description;
}

function createLinkToConfigurator(item) {
    return `./config.html?` +
        `objectID=${item.objectID}&printSize=${item.printSize}&` +
        `frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&` +
        `matColor=${item.matColor}&matWidth=${item.matWidth}`;
}
/**
 * Appends all nodes of {childNodes} to {parentNode}.
 *
 * @param parentNode the future parent node of all {childNodes}
 * @param childNodes the nodes to append as childes to {parentNode}
 * @returns the {parentNode} with all appended {childNodes}
 */
function appendChildNodes(parentNode, childNodes) {
    childNodes.forEach(child => parentNode.appendChild(child));
    return parentNode;
}

/**
 * Creates an {HTMLElement}-node with the specified attributes.
 *
 * @param tagName of the {HTMLElement} to create
 * @param attributesObject contains the attributes and their values as key-value-pairs
 * @returns a {HTMLElement} with the specified attributes
 */
function createElementNodeWithAttributes(tagName, attributesObject = {}) {
    let node = document.createElement(tagName);

    Object.getOwnPropertyNames(attributesObject).forEach(attribute => {
        node.setAttribute(`${attribute}`, `${attributesObject[attribute]}`)
    });

    return node;
}

/**
 * Inserts a message indicating an empty shopping cart
 */


/**
 * Creates an div node containing the message indicating an empty shopping cart.
 * @returns {HTMLDivElement} containing a span that contains the "empty shopping cart"-message
 */


/**
 * Disables the button with the id 'checkout-button'.
 */


/**
 *
 */
function addRemoveEventHandler(cart, objectID) {
    const removeButton = document.getElementById(objectID);

    removeButton.addEventListener('click', );
}

function setItemPrice(prices, objectID) {
    document.getElementById(`price-${objectID}`).innerHTML = prices[objectID];
}

function calculateItemPrices(cart) {
    if (cart == null) 

    let prices = {};
    for (let item of cart)  {
        const itemPrice = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        prices[item.objectID] = itemPrice;
    }

    return prices;
}

function setTotalCartPrice(prices) {
    let totalPrice = 0;
    for (let id in prices) {
        totalPrice += prices[id];
    }
    document.getElementById('price-total').innerHTML = totalPrice.toFixed(2);
}

function getCartStorage() {
    const cartStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cartStorage == null) 
    const cart = JSON.parse(cartStorage);
    if (cart.length == 0) 
    return cart;
}

function renderItemImage(item) {
    const imgContainer = document.getElementById(`preview-container-${item.objectID}`);
    const img = document.getElementById(`preview-${item.objectID}`);
    render(img, imgContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
}

function addOnclickEventHandlerToCheckout() {
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', );
}


pageLoad();