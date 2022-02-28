import * as frame from './frame.js';

var MET_API_OBJECTS_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/objects"

document.addEventListener("DOMContentLoaded", init());


export function init() {
	//localStorage.clear();
	//addItemToStorage(new Item(39799, 'M','classic',56,'red', 45));
	//addItemToStorage(new Item(38799,'L','classic',56,'red', 45));
	//localStorage.setItem("cart",JSON.stringify([{objectID: 39799,printSize: 'L', frameWidth: 27, frameStyle: 'classic',  matWidth: 31, matColor: 'indigo'},{objectID: 39799, printSize: 'S', frameWidth: 20, frameStyle: 'shabby',  matWidth: 0 }]))
	//checkCart();
	frame.updateItemAmount();
	printTotal()
	disableCheckout();
	cart_show_items();
}

export function printTotal(){
	const cart = frame.getListFromStorage();
	let price = 0;
	
	for(let i=cart.length-1 ; i>=0; i--){
		price += frame.calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth)
	}
	
	const total = document.getElementById("price-total");
	total.innerHTML = price;
	
}

export function getFramedescription(item) {
	let description = "";
	var itemFrameconfigi = item;
	var size = itemFrameconfigi['printSize'];
	if (size == 'S') {
		description += "Small ";
	} else if (size == 'M') {
		description += "Medium ";
	}
	description += "print in a " + (itemFrameconfigi['frameWidth'] / 10.0).toString() + " cm " +
		itemFrameconfigi['frameStyle'] + " frame";
		
	if(itemFrameconfigi['matColor']!=undefined){
		description += " with a " +
		(itemFrameconfigi['matWidth'] / 10.0).toString() + " cm " +
		itemFrameconfigi['matColor'] + " mat";
	}
	description += ".";
	
	return description;
}

export function cart_show_one(image, counter) {

	if (localStorage.getItem(image.objectID)) {
		var data = localStorage.getItem(image.objectID);
		data = JSON.parse(data);
		
		createNewCartItem(image, counter,data)

	}
}

export function render(img, preview, printSize, frameStyle, frameWidth, matColor, matWidth){
	img = document.getElementById(img);
	preview = document.getElementById(preview);
	frame.render(img, preview, printSize, frameStyle, frameWidth, matColor, matWidth)
}
window.render = render;

export function createNewCartItem(image, counter,data){
	const container = document.getElementById('cart');
	
	const newItem = document.createElement("div");
	newItem.setAttribute("class", "cart-item");
	newItem.setAttribute("value", image.objectID);
	
	const preview = document.createElement("div");
	preview.setAttribute("class", "cart-preview");
	preview.setAttribute("id", "preview-container-"+counter);
	
	const anchor = document.createElement("a");
	anchor.setAttribute("href","config.html?objectID=" 
		+ image.objectID + "&printSize=" 
		+ image.printSize + "&frameStyle=" 
		+ image.frameStyle + "&frameWidth=" 
		+ image.frameWidth + "&matColor=" 
		+ image.matColor + "&matWidth=" 
		+ image.matWidth);
		
	const img = document.createElement("img");
	img.setAttribute("class","cart-thumb");
	img.setAttribute("src",data.primaryImageSmall);
	img.setAttribute("id","preview-"+counter);
	img.setAttribute("alt","picture");
	img.setAttribute("onload","render(" + "\"preview-"+counter + "\",\"" + "preview-container-"+counter +"\", \"" + image.printSize + "\", \""+image.frameStyle+"\", \""+image.frameWidth+"\", \""+image.matColor+"\", \""+image.matWidth+"\")");

	
	
	//todo call render
	anchor.appendChild(img);
	preview.appendChild(anchor);
	newItem.appendChild(preview);
	
	const label = document.createElement("div");
	label.setAttribute("class","museum-label");
	
	const text = document.createElement("div");
	
	const artist = document.createElement("span");
	artist.setAttribute("class","artist");
	artist.innerHTML = data.artistDisplayName;
	text.appendChild(artist);
	
	const title = document.createElement("span");
	title.setAttribute("class","title");
	title.innerHTML = data.title;
	text.appendChild(title);

	const te = document.createTextNode(", ")
	text.appendChild(te);
	
	const date = document.createElement("span");
	date.setAttribute("class","date");
	date.innerHTML= data.objectDate;
	text.appendChild(date);
	
	
	text.appendChild(document.createElement("br"));
	text.appendChild(document.createElement("br"));
	
	const descr = document.createElement("span");
	descr.setAttribute("class","frame-description");
	descr.innerHTML = getFramedescription(image);
	text.appendChild(descr);
	
	label.appendChild(text);
	
	const price = document.createElement("div");
	price.setAttribute("class","cart-price");
	price.setAttribute("id","price-"+counter);
	price.innerHTML = "€ " + frame.calculatePrice(image.printSize,image.frameStyle, image.frameWidth, image.matWidth);	//todo insert real price
	
	label.appendChild(price);
	
	const button = document.createElement("button");
	button.setAttribute("class","cart-remove");
	button.setAttribute("type","button");
	button.setAttribute("onclick",'closeItem(this.id)');
	button.setAttribute("id",counter);
	
	label.appendChild(button);
	
	newItem.appendChild(label);
	
	container.prepend(newItem);

}

export function cart_show_items() {

	const cart = frame.getListFromStorage();

	for(let i=cart.length-1 ; i>=0; i--){
		cart_show_one(cart[i],i);	
	}
}


export 
window.closeItem = closeItem;

export function disableCheckout(){
	if(frame.getListFromStorage().length==0)
}
