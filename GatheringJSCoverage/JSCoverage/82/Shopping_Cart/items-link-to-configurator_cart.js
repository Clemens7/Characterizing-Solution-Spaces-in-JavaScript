import {calculatePrice, render} from "../frame.js";
import {getStorageCart, getCartLength, getStoredObject, cacheObject} from "./cache.js";
import {retrieveObject} from "./met.js";


const section = document.getElementById("cart");

/** Html for sumtotal - taken from given cart.html*/
const cartTotal = document.createElement("div");
	cartTotal.className = "cart-total";
	cartTotal.innerHTML = "<div class=\"price\">Total: € <span id=\"price-total\">0</span></div>\n" + "<button type=\"button\" id=\"checkout-button\" disabled=\"true\">Checkout</button>";

/** Html in case cart is empty*/
const noItems = document.createElement("p");
	noItems.style = "margin: 50px 0";
	noItems.innerText = "There are no items in your shopping cart.";


loadPage();


/** loads content of page (item preview, item description, sumtotal) */
function loadPage(){
	let cacheCart = getStorageCart();
	document.querySelector('#cart-link').innerHTML = ((getCartLength() === 0)  : `Cart (${getCartLength()})`);
	if (cacheCart.length !== 0) {
		generateCart(cacheCart);
	}
}

/** generates code of item preview per item in cart */
function generateCart(cartWorking){
	let amountsInCart = countInCart(cartWorking);
	let sumTotal = 0;
	for (let i = 0; i < getCartLength(); i++) {
		let current = document.createElement("div");
		let objectID = cartWorking[i].objectID;
		let artworkInfo = getStoredObject(objectID);
		let printSize = cartWorking[i].printSize;
		let frameStyle = cartWorking[i].frameStyle;
		let frameWidth = cartWorking[i].frameWidth;
		let matWidth = cartWorking[i].matWidth;
		let matColor = cartWorking[i].matColor;
		let occurrence = amountsInCart.get(objectID);
		let currentPrice = calculatePrice(printSize, frameStyle, frameWidth, matWidth);

		current.className = "cart-item";
		current.id = `item-${objectID}-${occurrence}`;
		buildPreviewAndDescription(objectID, current, occurrence);
		section.insertBefore(current, section.firstChild);
		let container = document.querySelector(`#preview-container-${objectID}-${occurrence}`);

		if (artworkInfo === null) {
			retrieveObject(objectID)
				.then(value => {
					displayImgAndInfo(objectID, occurrence, value, container, printSize, frameWidth, frameStyle, matColor, matWidth, currentPrice);
					cacheObject(value);
				});
		}


		document.querySelector(`#item-${objectID}-${occurrence} a`).href = `/config.html?objectID=${objectID}&printSize=${printSize}&frameWidth=${frameWidth}&frameStyle=${frameStyle}&matColor=${cartWorking[i].matColor}&matWidth=${matWidth}`;
        document.querySelector(`#remove-${objectID}-${occurrence}`).addEventListener('click', );


		sumTotal += currentPrice;
		amountsInCart.set(objectID, occurrence-1);
	}

	section.appendChild(cartTotal);

	document.querySelector('#price-total').innerHTML = sumTotal.toFixed(2);

	document.querySelector("#checkout-button").disabled = false;
	document.querySelector("#checkout-button").addEventListener("click", );

}


/** helper to construct the text for mat / frame description
 *
 * @param printSize
 * @param frameWidth
 * @param frameStyle
 * @param matColor
 * @param matWidth
 * */
function buildText(printSize, frameWidth, frameStyle, matColor, matWidth){
	let printText;
	switch(printSize){
		case "L":
			printText = "Large ";
			break;
		case "M":
			printText = "Medium ";
			break;
		case "S":
			printText = "Small ";
			break;
	}

	if(matWidth!==0){
		printText += `print in a ${frameWidth/10.0} cm ${frameStyle} frame with a ${matWidth/10.0} cm ${matColor} mat.`
	}
	return printText;
}

/** helper promise to load the image loaded (otherwise rendering doesn't work as it should)*
 *
 * @param src url of artwork to be loaded
 * */
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", );
		img.src = src;
	});
}

/** helper to remove item (with given id) from cart
 *
 * @param id objectID of Item to be removed
 * @param occurrence the nth item of this id
 * */


function buildPreviewAndDescription(objectID, container, number){
	let preview = document.createElement('div');
	let imgLink = document.createElement('a');
	let img = document.createElement('img');
	let description = document.createElement('div');
	let artworkInfo = document.createElement('div');
	let artist = document.createElement('span');
	let title = document.createElement('span');
	let date = document.createElement('span');
	let frameDescription = document.createElement('span');
	let cartPrice = document.createElement('div');
	let price = document.createElement('span');
	let cartRemove = document.createElement('button');
	let lineBreak = document.createElement('br');

	preview.id = `preview-container-${objectID}-${number}`;
	preview.className='cart-preview';

	img.className='cart-thumb';
	img.id = `preview-${objectID}-${number}`;

	description.className = 'museum-label';

	frameDescription.className = 'frame-description';

	cartPrice.className = 'cart-price';

	price.id = `price-${objectID}-${number}`;

	cartRemove.className = 'cart-remove';
	cartRemove.id = `remove-${objectID}-${number}`;

	artist.className = 'artist';
	title.className = 'title';
	date.className = 'date';

	container.appendChild(preview);
		preview.appendChild(imgLink);
			imgLink.appendChild(img);
	container.appendChild(description);
		description.appendChild(artworkInfo);
			artworkInfo.appendChild(artist);
			artworkInfo.appendChild(title);
			artworkInfo.appendChild(date);
			artworkInfo.appendChild(lineBreak);
			artworkInfo.appendChild(lineBreak);
				artworkInfo.appendChild(frameDescription);
			artworkInfo.appendChild(cartPrice);
				cartPrice.appendChild(price);
			artworkInfo.appendChild(cartRemove);
}

function countInCart(storedCart){
	let out = new Map();
	for(let i of storedCart){
		if(out.has(i.objectID))else{
			out.set(i.objectID, 1);
		}
	}
	return out;
}

function displayImgAndInfo(objectID, occurrence, artworkInfo, container, printSize, frameWidth, frameStyle, matColor, matWidth, currentPrice) {
	document.querySelector(`#item-${objectID}-${occurrence} .artist`).innerHTML = artworkInfo.artistDisplayName;
	document.querySelector(`#item-${objectID}-${occurrence} .title`).innerHTML = artworkInfo.title + ", ";
	document.querySelector(`#item-${objectID}-${occurrence} .date`).innerHTML = artworkInfo.objectDate;
	document.querySelector(`#item-${objectID}-${occurrence} .frame-description`).innerHTML = buildText(printSize, frameWidth, frameStyle, matColor, matWidth);
	document.querySelector(`#price-${objectID}-${occurrence}`).innerHTML = currentPrice;


	loadImage(artworkInfo.primaryImageSmall).then(img => {
		let previewImg = document.querySelector(`#preview-${objectID}-${occurrence}`);
		previewImg.src = img.src;
		render(previewImg, container, printSize, frameStyle, frameWidth, matColor, matWidth);
	})
		.catch();

}

