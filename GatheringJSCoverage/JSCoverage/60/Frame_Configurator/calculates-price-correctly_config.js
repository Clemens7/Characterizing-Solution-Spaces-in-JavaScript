import { calculatePrice, getPrintSizes, render } from './frame.js';

window.onload = async function () {

  //Get all query parameters.
  var url = new URL(window.location.href);
  var objectId = url.searchParams.get("objectID");
  var printSize = url.searchParams.get("printSize");
  var frameStyle = url.searchParams.get("frameStyle");
  var frameWidth = url.searchParams.get("frameWidth");
  var matColor = url.searchParams.get("matColor");
  var matWidth = url.searchParams.get("matWidth");

  //If no objectID is given, go to search page.
  if(objectId == null || objectId == "") 
  //If null, set default.
  if(printSize == null )
    printSize = "M";
  if(frameStyle == null )
    frameStyle = "natural";
  if(frameWidth == null )
    frameWidth = 40
  if(matColor == null )
    matColor = "mint";
  if(matWidth == null )
    matWidth = 55;

  //Set printing size from query parameter printSize
  switch(printSize) {
    
    case 'M': document.getElementById("print-size-m").checked = true;
      break;
    
  }

  //Set frame width from query parameter frameWidth
  if(frameWidth != null) {
    if(frameWidth < 20)  else if(frameWidth > 50) 
    document.getElementById("frameWidth").value = Math.round(frameWidth) / 10;
    document.getElementById("rangeFrameWidth").value = Math.round(frameWidth) / 10;
  }

  //Set frame style from query parameter frameStyle
  switch(frameStyle) {
    
    case 'natural': document.getElementById("frame-style-natural").checked = true;
      break;
    
    
  }

  //Set material width from query parameter matWidth
  if(matWidth != null) {
    if(matWidth < 0)  else if(matWidth > 100) 
    document.getElementById("matWidth").value = Math.round(matWidth) / 10;
    document.getElementById("rangeMatWidth").value = Math.round(matWidth) / 10;
  }

  //Set material color from query parameter matColor
  switch(matColor) {
    
    case 'mint': document.getElementById("mat-color-mint").checked = true;
      break;
    
    
    
  }

  //Set total price
  document.getElementById("price").innerHTML = "€ " + calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);

  //Fetch image.
  var shoppingCart2 = [];
  var shoppingCartObjects = JSON.parse(localStorage.getItem('cache'));

  if (shoppingCartObjects == null){
    shoppingCartObjects = [];
  }

  var filteredShoppingCartObjects = shoppingCartObjects.filter();

  if (filteredShoppingCartObjects.length > 1)

  if (filteredShoppingCartObjects.length == 0){
      this.console.error("No object with the given ID");
  }

  var fetchedObject = filteredShoppingCartObjects[0];

  this.console.log(fetchedObject);



  /* if(shoppingCartObjects != null && shoppingCartObjects.objectID == objectId){
    fetchedObject = shoppingCartObjects; */

  //}
  if(!fetchedObject) {

    var myResponse = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectId);
    fetchedObject = await myResponse.json();
    const metObject = {"objectID": objectId, "primaryImageSmall": fetchedObject.primaryImageSmall, "artistDisplayName": fetchedObject.artistDisplayName, "title": fetchedObject.title, "objectDate": fetchedObject.objectDate};
    this.console.log("metObject:",metObject);
    shoppingCartObjects.unshift(metObject);
    localStorage.setItem('cache', JSON.stringify(shoppingCartObjects));

    /* localStorage.setItem('cache', JSON.stringify({'objectID': objectId, 'primaryImageSmall': myObject.primaryImageSmall, 'artistDisplayName': myObject.artistDisplayName, 'title': myObject.title, 'objectDate': myObject.objectDate})); */
  }

  var imgSrc = fetchedObject.primaryImageSmall;

  //If no image is found, go to search page.
  if(imgSrc == "" || imgSrc == null) 

  //Set correct image source and label for the given artwork.
  var myImg = document.getElementById("preview-image");
  myImg.src = imgSrc;
  document.getElementById("image-label").innerHTML = "<b>" + fetchedObject.artistDisplayName + "</b><br><i>" + fetchedObject.title + "</i>, " + fetchedObject.objectDate;

  myImg.onload = function () {
    var sizes = getPrintSizes(myImg);

    document.getElementById("print-size-s-label").innerHTML = "Small<br>" + sizes.S[0]/10 + " × " + sizes.S[1]/10 + " cm";
    document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + sizes.M[0]/10 + " × " + sizes.M[1]/10 + " cm";
    document.getElementById("print-size-l-label").innerHTML = "Large<br>" + sizes.L[0]/10 + " × " + sizes.L[1]/10 + " cm";

    render(myImg, document.getElementById("preview-container"), printSize, frameStyle, frameWidth, matColor, matWidth);

    var totalWidth = sizes[printSize][0]/10+frameWidth*0.2+matWidth*0.2;
    var totalHeight = sizes[printSize][1]/10+frameWidth*0.2+matWidth*0.2;
    document.getElementById("total-size").innerHTML = totalWidth + " × " + totalHeight + " cm";
  }

  var myCart = JSON.parse(localStorage.getItem('cart'));
  if(myCart.length != 0) }//window.onload done.

//Check if valid frame width on change.
document.getElementById("frameWidth").onchange = function () {
  var frameWidth = document.getElementById("frameWidth").value;
  if(frameWidth < 2)  else if(frameWidth > 5) 
  document.getElementById("frameWidth").value = Math.round(frameWidth * 10) / 10;
  document.getElementById("rangeFrameWidth").value = Math.round(frameWidth * 10) / 10;
  update();
}

//Check if valid material width on change.
document.getElementById("matWidth").onchange = function () {
  var matWidth = document.getElementById("matWidth").value;
  if(matWidth < 0)  else if(matWidth > 10) 
  document.getElementById("matWidth").value = Math.round(matWidth * 10) / 10;
  document.getElementById("rangeMatWidth").value = Math.round(matWidth * 10) / 10;
  update();
}

//If different print size is chosen, update.
document.getElementById('print-size-s').onclick = update;
document.getElementById('print-size-m').onclick = update;
document.getElementById('print-size-l').onclick = update;

//If different frame style is chosen, update.
document.getElementById('frame-style-classic').onclick = update;
document.getElementById('frame-style-natural').onclick = update;
document.getElementById('frame-style-shabby').onclick = update;
document.getElementById('frame-style-elegant').onclick = update;

//If different material color is chosen, update.
document.getElementById('mat-color-ivory').onclick = update;
document.getElementById('mat-color-mint').onclick = update;
document.getElementById('mat-color-wine').onclick = update;
document.getElementById('mat-color-indigo').onclick = update;
document.getElementById('mat-color-coal').onclick = update;

//If frame width changes, update.
document.getElementById("frameWidth").oninput = function () {
  document.getElementById("rangeFrameWidth").value = document.getElementById("frameWidth").value;
}
document.getElementById("rangeFrameWidth").oninput = 

//If material width changes, update.
document.getElementById("matWidth").oninput = function () {
  document.getElementById("rangeMatWidth").value = document.getElementById("matWidth").value;
}
document.getElementById("rangeMatWidth").oninput = 

//**************************************************
//This right here is the data transfer to cart page.
//**************************************************
//If form is submitted, save config into local storage and go to cart.html.
document.getElementById("config-form").onsubmit = 

//Rerender image, correct total price and update total Size.
function update() {
  var checks = getChecks();
  var myImg = document.getElementById("preview-image");
  render(myImg, document.getElementById("preview-container"), checks[0], checks[1], checks[2], checks[3], checks[4]);
  document.getElementById("price").innerHTML = "€ " + calculatePrice(checks[0], checks[1], checks[2], checks[4]).toFixed(2);
  var sizes = getPrintSizes(myImg);

  var totalWidth = (sizes[checks[0]][0]/10+checks[2]*0.2+checks[4]*0.2).toFixed(1);
  var totalHeight = (sizes[checks[0]][1]/10+checks[2]*0.2+checks[4]*0.2).toFixed(1);
  document.getElementById("total-size").innerHTML = totalWidth + " × " + totalHeight + " cm";
}

//Get all current checks and values.
//                     0          1           2           3         4
//Returns array = [printSize, frameStyle, frameWidth, matColor, matWidth].
function getChecks() {
  var size, style, fWidth, mColor, mWidth;
  if(document.getElementById("print-size-s").checked)
    size = 'S';
  else if(document.getElementById("print-size-m").checked)
    size = 'M';
  else if(document.getElementById("print-size-l").checked)
    size = 'L';

  if(document.getElementById("frame-style-classic").checked)
    style = 'classic';
  else if(document.getElementById("frame-style-natural").checked)
    style = 'natural';
  else if(document.getElementById("frame-style-shabby").checked)
    style = 'shabby';
  else if(document.getElementById("frame-style-elegant").checked)
    style = 'elegant';

  fWidth = document.getElementById("frameWidth").value*10;

  if(document.getElementById("mat-color-ivory").checked)
    mColor = 'ivory';
  else if(document.getElementById("mat-color-mint").checked)
    mColor = 'mint';
  else if(document.getElementById("mat-color-wine").checked)
    mColor = 'wine';
  else if(document.getElementById("mat-color-indigo").checked)
    
  else if(document.getElementById("mat-color-coal").checked)
    mColor = 'coal';

  mWidth = document.getElementById("matWidth").value*10;

  return [size, style, fWidth, mColor, mWidth];
}
