import { calculatePrice, render, getPrintSizes} from './frame.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var oid = urlParams.get('objectID');
var printsize=urlParams.get('printSize');
var frameStyle=urlParams.get('frameStyle');
var frameWidth=urlParams.get('frameWidth');
var matColor=urlParams.get('matColor');
var matWidth=urlParams.get('matWidth');

class artElement {
	constructor(objectId, artistDisplayName, title, objectDate, primaryImageSmall) {
		this.objectId = objectId;
		this.artistDisplayName = artistDisplayName;
		this.title = title;
		this.objectDate = objectDate;
		this.primaryImageSmall = primaryImageSmall;
	}
}

document.addEventListener('DOMContentLoaded', redirectIfNessecary);

function redirectIfNessecary(){
	if(!oid || isNaN(oid))
}

window.onload = startFunc();

/*
MAIN
*/
function startFunc() {

	numberOfItemsInNavBar();
	document.getElementById("frameWidth").addEventListener("change", showValue1);
	document.getElementById("submit-button").addEventListener("click", storeframe);
	document.getElementById("matWidth").addEventListener("change", showValue3);
	document.getElementById("frameWidthR").addEventListener("change", showValue);
	document.getElementById("frameWidthR").addEventListener("input", showValue);
	document.getElementById("matWidthR").addEventListener("change", showValue2);
	document.getElementById("matWidthR").addEventListener("input", showValue2);

	document.getElementById("mat-color-ivory").addEventListener("change", checkmat);
	document.getElementById("mat-color-mint").addEventListener("change", checkmat);
	document.getElementById("mat-color-wine").addEventListener("change", checkmat);
	document.getElementById("mat-color-indigo").addEventListener("change", checkmat);
	document.getElementById("mat-color-coal").addEventListener("change", checkmat);

	document.getElementById("frame-style-classic").addEventListener("change", checkstyle);
	document.getElementById("frame-style-natural").addEventListener("change", checkstyle);
	document.getElementById("frame-style-shabby").addEventListener("change", checkstyle);
	document.getElementById("frame-style-elegant").addEventListener("change", checkstyle);

	document.getElementById("print-size-s").addEventListener("change", checkPrintSize);
	document.getElementById("print-size-m").addEventListener("change", checkPrintSize);
	document.getElementById("print-size-l").addEventListener("change", checkPrintSize);

	let elementToConfig = loadElementFromLocalStorageById(oid);
	console.log(elementToConfig);
	if(elementToConfig!=null)  else {


		//GET REQUEST
		const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + oid;

		fetch(url)
			.then(
				function (response) {
					if (response.status !== 200) 

					// Examine the text in the response
					response.json().then(function (data) {
						console.log("loaded Element from API: ");
						console.log(data.primaryImageSmall);
						elementToConfig = new artElement(data.objectID, data.artistDisplayName, data.title, data.objectDate, data.primaryImageSmall);
						store(elementToConfig);
						document.getElementById("preview-image").src = elementToConfig.primaryImageSmall;

						render(document.getElementById("preview-image"), document.getElementById("preview-container"), getImageSize(), getFrameStyle(), document.getElementById("frameWidth").value, getMatColor(), document.getElementById("matWidth").value);
						document.getElementById("p-title").innerHTML = elementToConfig.title + elementToConfig.artistDisplayName + elementToConfig.objectDate;

						// document.getElementById("preview-image").src = data.primaryImageSmall;
						//
						// render(document.getElementById("preview-image"), document.getElementById("preview-container"), getImageSize(), getFrameStyle(), document.getElementById("frameWidth").value, getMatColor(), document.getElementById("matWidth").value);
						//
						// document.getElementById("p-title").innerHTML = data.title + data.artistDisplayName + data.objectDate;
						// store(new artElement(data.objectID, data.artistDisplayName, data.title, data.objectDate, data.primaryImageSmall));
					});
				}
			)
			.catch();
	}






	/*
	Fill the FORM with GET Values
	*/
	if(printsize=='S' || printsize=='s')else if(printsize=='L' || printsize=='l')else{
		document.getElementById("print-size-s").checked= false;
		document.getElementById("print-size-m").checked = true;
		document.getElementById("print-size-l").checked = false;
		printsize='M';
	}

	if(frameStyle=="classic")else if(frameStyle=="natural")else if(frameStyle=="shabby")else if(frameStyle=="elegant")

	if(matColor=="ivory")else if(matColor=="mint")else if(matColor=="wine")else if(matColor=="indigo")else if(matColor=="coal")

	if(frameWidth)

	if(matWidth)
	checkprice();

}


// -- caching --
function store(elem) {
	console.log("storing" + elem.objectId);
	localStorage[elem.objectId] = JSON.stringify(elem);
}

function loadElementFromLocalStorageById(objectId) {
	if (objectId in localStorage) 
}









function checkprice(){

	render(document.getElementById("preview-image"), document.getElementById("preview-container"), getImageSize(), getFrameStyle(), document.getElementById("frameWidth").value, getMatColor(), document.getElementById("matWidth").value);

	var imageSize = getImageSize();
	var frameStyle = getFrameStyle();
	var frameWidth = document.getElementById("frameWidth").value;
	var matWidth = document.getElementById("matWidth").value

	var preis=calculatePrice(imageSize, frameStyle, frameWidth, matWidth);
	console.log(preis);
	document.getElementById("price").innerHTML='€ ' + (Math.round(preis * 100)/100).toFixed(2);
}

function getImageSize(){
	if(document.getElementById("print-size-s").checked == true) else if(document.getElementById("print-size-m").checked == true){
		return "M";
	}
}

function getFrameStyle(){
	var frameStyles = document.getElementsByName("frameStyle");
	var frameStyle;

	for(var i = 0; i < frameStyles.length; i++) {
		if(frameStyles[i].checked)
			frameStyle = frameStyles[i].value;
	}
	return frameStyle;
}

function getMatColor(){
	var colors = document.getElementsByName("matColor");
	var color;

	for(var i = 0; i < colors.length; i++){
		if(colors[i].checked){
			color = colors[i];
		}
	}
}


/*
sync boxes and sliders  --FRAME
*/
//FRAME slider to box


//FRAME box to slider
function showValue1(){

	var id = event.srcElement.id;
	var newValue = document.getElementById(id).value;

	var realvalue=Math.round(newValue*10)/10;
	if(realvalue <=5 && realvalue>=2){
		document.getElementById("frameWidth").value=Math.round(newValue*10)/10;
		document.getElementById("frameWidthR").value=Math.round(newValue*10)/10;
		checkprice();
	}else if(realvalue<=2){
		document.getElementById("frameWidth").value=2;
		document.getElementById("frameWidthR").value=2;
		checkprice();
	}else{
		document.getElementById("frameWidth").value=5;
		document.getElementById("frameWidthR").value=5;
		checkprice();
	}
}



/*
sync boxes and sliders --MAT
*/
//FRAME slider to box


//FRAME box to slider



/*
******Speichert frameconfig in local storage"cart"
*/




function numberOfItemsInNavBar() {
	if(totalCount() == 0) {
		var b = "Cart";
	}
	var a = document.getElementById("cart-link").innerHTML = b;

}

function totalCount() { // funktioniert imma noch
	var count = 0;
	var arr = getCartItemsAsJSON();

	for(var item in arr) }




function getCartItemsAsJSON(){

	var json = JSON.parse(getCartAsString());
	return json;
}

function getCartAsString(){
	return window.localStorage.getItem("cart");
}
