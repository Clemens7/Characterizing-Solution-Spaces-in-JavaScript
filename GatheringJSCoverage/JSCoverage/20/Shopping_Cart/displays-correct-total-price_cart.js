import { calculatePrice, render, getPrintSizes} from './frame.js';

window.onload = startFunc();
document.addEventListener('DOMContentLoaded', showEmptyMessage);


// --- Main --- //

class artElement {
	constructor(objectID, artistDisplayName, title, objectDate, primaryImageSmall) {
		this.objectID = objectID;
		this.artistDisplayName = artistDisplayName;
		this.title = title;
		this.objectDate = objectDate;
		this.primaryImageSmall = primaryImageSmall;
	}
}

function startFunc() {

	//setDefaultCart();

	if(checkIfShoppingCartIsEmpty())

	loadItems();

	var json = getCartItemsAsJSON();

	numberOfItemsInNevBar();
	getFrameDescriptionString(0);

	document.getElementById("price-total").innerHTML = totalPrice();
}


function showEmptyMessage(){

	if(checkIfShoppingCartIsEmpty())
}


// --- Local Storage --- //




// --- loading Items --- //

function loadItem(jsonOfItem, number){

	//part 1
	var outerDiv = document.createElement("div");
	outerDiv.setAttribute("class", "cart-item");

	var cartPreviewDiv = document.createElement("div");
	cartPreviewDiv.setAttribute("class", "cart-preview");
	cartPreviewDiv.setAttribute("id", "preview-container-" + number);

	var previewLink = document.createElement("a");
	previewLink.setAttribute("href", "config.html?objectID=" + jsonOfItem.objectID
		+ "&printSize=" + jsonOfItem.printSize 
		+ "&frameStyle=" + jsonOfItem.frameStyle 
		+ "&frameWidth=" + jsonOfItem.frameWidth 
		+ "&matColor=" + jsonOfItem.matColor
		+ "&matWidth=" + jsonOfItem.matWidth
		);
		
	var previewImage = document.createElement("img");
	previewImage.setAttribute("class", "cart-thumb");
	previewImage.setAttribute("src", "null");
	previewImage.setAttribute("id", "preview-" + number);
	previewImage.setAttribute("alt", "alternativtext");

	//part 2

	var museumLabelDiv = document.createElement("div");
	museumLabelDiv.setAttribute("class", "museum-label");

	var div = document.createElement("div");

	var artistSpan = document.createElement("span");
	artistSpan.setAttribute("class", "artist");
	artistSpan.setAttribute("id", "artist-" + number);


	var titelSpan = document.createElement("span");
	titelSpan.setAttribute("class", "titel");
	titelSpan.setAttribute("id", "title-" + number);

	var dateSpan = document.createElement("span");
	dateSpan.setAttribute("class", "date");
  	dateSpan.setAttribute("id", "date-" + number);

  	var descriptionSpan = document.createElement("span");
  	descriptionSpan.setAttribute("class", "frame-description");  	//braucht auch eine Number + ID
	descriptionSpan.setAttribute("id", "frame-description" + number);

    var priceDiv = document.createElement("div");
	priceDiv.setAttribute("class", "cart-price");

	var priceSpan = document.createElement("span");
	priceSpan.setAttribute("id", "price-" + number);

	var buttonRemove = document.createElement("button");
	buttonRemove.setAttribute("class", "cart-remove");
	buttonRemove.setAttribute("type", "reset");
	buttonRemove.setAttribute("id", number)
	//buttonRemove.setAttribute("onclick", "removeItemFromCart()");
	buttonRemove.addEventListener("click", removeItemFromCart);


	div.appendChild(artistSpan);
	div.appendChild(titelSpan);
	div.appendChild(dateSpan);
	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));
	div.appendChild(descriptionSpan)

	museumLabelDiv.appendChild(div);
	priceDiv.appendChild(priceSpan);
	museumLabelDiv.appendChild(priceDiv);
	museumLabelDiv.appendChild(buttonRemove)

	previewLink.appendChild(previewImage);
	cartPreviewDiv.appendChild(previewLink);
	outerDiv.appendChild(cartPreviewDiv);
	outerDiv.appendChild(museumLabelDiv);

	getShoppingCart().insertBefore(outerDiv, getCheckoutDiv());

	getDataOfImage(jsonOfItem.objectID, number, jsonOfItem.printSize, jsonOfItem.frameStyle, jsonOfItem.frameWidth, jsonOfItem.matColor, jsonOfItem.matWidth);

}

async function loadElementById(objectID, number) {
	let locallyStoredElement = loadElementFromLocalStorageById(objectID);
	console.log(locallyStoredElement);
	if(locallyStoredElement!=null)
	let resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
	resp = await resp.json();
	console.log("Fetch Result: " + resp.objectID + resp.displayName + resp.title + resp.objectDate);
	let elem = new artElement(resp.objectID, resp.artistDisplayName, resp.title, resp.objectDate, resp.primaryImageSmall);
	store(elem);
	return elem;
}

async function getDataOfImage(oid, number, size, syle, fwidth, col, mwidth){
	let data = await loadElementById(oid, number);
	console.log("inserting" + data.primaryImageSmall);
	document.getElementById("artist-" + number).innerHTML = data.artistDisplayName;
	document.getElementById("title-" + number).innerHTML = data.title;
	document.getElementById("date-" + number).innerHTML = ", " +  data.objectDate;

	/*var bild = data.primaryImageSmall;
	document.getElementById("preview-" + number).setAttribute("src", render(bild,
	"preview-" + number, size, syle, fwidth, col, mwidth));
	*/
	//var config = getCartItemsAsJSON;
	let imageTag = document.querySelector(`#preview-${number}`);
	imageTag.src = data.primaryImageSmall;
	let container = document.querySelector(`#preview-container-${number}`);
	console.log(container);
	render(imageTag, container, size, syle, fwidth, col, mwidth);
	//render(config, "preview-" + number);
	console.log("primary: " + data.primaryImageSmall);
	//document.getElementById("preview-" + number).setAttribute("src", data.primaryImageSmall);
	document.getElementById("frame-description" + number).innerHTML = getFrameDescriptionString(number);
	document.getElementById("price-" + number).innerHTML ="€ " + price(number);
}


function getShoppingCart(){
	return document.getElementById("cart");
}

function getCheckoutDiv(){
	return document.getElementById("cart-total-end-of-the-page");
}


function loadItems(){
	var json = getCartItemsAsJSON();

	for(var item = json.length-1; item >= 0; item--){
		loadItem(json[item], item);
	}
}


// --- caching -- //
function store(elem) {
	console.log("storing " + elem.objectID);
	localStorage[elem.objectID] = JSON.stringify(elem);
}

function loadElementFromLocalStorageById(objectID) {
	if (objectID in localStorage) 
}


// --- nav bar Cart / Cart(x) --//

function numberOfItemsInNevBar() { 
    if(totalCount() == 0)  else {
        var b = "Cart (" + totalCount() + ")";
    }
    var a = document.getElementById("cart-link").innerHTML = b;

}

function checkIfShoppingCartIsEmpty(){
	if(getCartAsString() != 0 && getCartAsString() != null){

		var json = getCartItemsAsJSON();

		if(json == null)

		if(json.length > 0){
			return false;
		}
}




// --- Total Number --- //

function totalCount() { // funktioniert imma noch
	var count = 0;
	var arr = getCartItemsAsJSON();

	for(var item in arr) {
		count++;
	}

	return count;
}





// --- Frame Description --- //

function getFrameDescriptionString(number) {
    var arr = getCartItemsAsJSON();

    var sml = getSML(number); //funkt
    var frameWidth = arr[number]["frameWidth"];
	frameWidth = frameWidth/10;
    var frameStyle = arr[number]["frameStyle"];
    var matWidth = arr[number]["matWidth"];
	matWidth = matWidth/10;
    var matStyle = arr[number]["matColor"];

    var description = "";

    if(matWidth == 0) 
    else {
        description = sml + " print in a " + frameWidth + " cm " + frameStyle + " frame with a " + matWidth + " cm "+ matStyle +" mat.";
    }
    return description;

}
// --- get Small, Medium or Large --- //

function getSML(number) { 
	var arr = getCartItemsAsJSON();

	var sml = arr[number]["printSize"];

	if(sml == "S") {
		return "Small";
	}

	if(sml == "M") 

	if(sml == "L") {
		return "Large";
	}

}

// --- price --- //

function price(number) {
	var arr = getCartItemsAsJSON();

	return calculatePrice(arr[number]["printSize"], arr[number]["frameStyle"], arr[number]["frameWidth"], arr[number]["matWidth"]);

}

function totalPrice() {
	var arr = getCartItemsAsJSON();

	var total = 0;

	for(var i = 0; i < arr.length; i++){
		total = total + calculatePrice(arr[i].printSize, arr[i].frameStyle, arr[i].frameWidth, arr[i].matWidth);
	}
	return total;

}

// --- remove --- //



// --- help functions --- //

function getCartItemsAsJSON(){

	var json = JSON.parse(getCartAsString());
	return json;
}

function getCartAsString(){
	return window.localStorage.getItem("cart");
}
