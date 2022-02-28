import * as frame from './frame.js';

var MET_API_OBJECTS_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"

window.onload = function onloadFunction() {
	setPreviewImage();
	setParam();
	frame.updateItemAmount();
	updateSizes();
	updatePricePreviewImg();
};

document.getElementById("config-form").addEventListener("submit", );

document.getElementById('frameWidth').addEventListener("focusout", );
document.getElementById('frameWidthR').addEventListener("focusout", );
document.getElementById('matWidth').addEventListener("focusout", function(){updateSliderM('matWidth','matWidthR')});
document.getElementById('matWidthR').addEventListener("focusout", );

//add event handlers for updatePricePreviewImg
var radios = document.querySelectorAll('input[type="radio"]');
    for( let i = 0; i < radios.length; i++ ) {
        radios[i].addEventListener("click", updatePricePreviewImg);
    }




function updateSliderM(slideValue,output) {
	slideValue=document.getElementById(slideValue);
	var output = document.getElementById(output);
	if(slideValue.value>=0 && slideValue.value<=10){
		slideValue.value=Math.round(slideValue.value*10)/10;
		output.value=slideValue.value;
	}
	updatePricePreviewImg();
}

function updatePricePreviewImg(){
	let printSize=document.querySelector('input[name="printSize"]:checked').value;
	let frameStyle=document.querySelector('input[name="frameStyle"]:checked').value;
	let frameWidth=document.getElementById('frameWidth').value*10;
	let matWidth=document.getElementById('matWidth').value*10;
	let price=frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
	let matColor=document.querySelector('input[name="matColor"]:checked').value;
	let container=document.getElementById('preview-container');
	let img= document.getElementById("preview-image");

	
	// add 0 if price is xx.x instead of xx.xx
	if(price.toString().substring(price.toString().indexOf("."),price.toString().length).length ==2)
	document.getElementById('price').innerHTML="€ "+price;
	
	frame.render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);

	}

function updateSizes(){
	let img = document.getElementById("preview-image");
	let sizes=frame.getPrintSizes(img);
	document.getElementById('print-size-s-label').innerHTML="Small<br>"+sizes['S'][0]/10+" × "+sizes['S'][1]/10+" cm";
	document.getElementById('print-size-m-label').innerHTML="Medium<br>"+sizes['M'][0]/10+" × "+sizes['M'][1]/10+" cm";
	document.getElementById('print-size-l-label').innerHTML="Large<br>"+sizes['L'][0]/10+" × "+sizes['L'][1]/10+" cm";


}

function setParam(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	if(urlParams.has('printSize'))
	
	if(urlParams.has('frameStyle'))
		
	if(urlParams.has('matColor'))
	
	if(urlParams.has('matWidth'))
	
	if(urlParams.has('frameWidth'))
}







function setPreviewImage() {
	var params = (new URL(document.location)).searchParams;
	var objectID = params.get("objectID");

	if (!objectID) 
	if (localStorage.getItem(objectID))  else {
		console.log("fetching from API: " + objectID);
		fetch(MET_API_OBJECTS_ENDPOINT + objectID)
			.then(function(response) {
				// redirect if object not found
				if (response.status === 404) 
			})
			.then(res => res.json())
			.then()
			.catch(err => {
				console.error(err);
			});
	}
}
