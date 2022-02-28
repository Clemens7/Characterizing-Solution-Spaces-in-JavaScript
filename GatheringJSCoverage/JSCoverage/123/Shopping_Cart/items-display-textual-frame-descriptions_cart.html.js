
import * as frame from "./frame.js";

// local storage
//TODO: get data from search/frame Configurator                                            <- // TODO !

// this data should be generated dynamically from the user!
/*
let arrayOfObjects = [{
  "objectID":"1",
  "printSize":"5",
  "frameStyle":"wood",
  "frameWidth":"500",
  "matColor":"red",
  "matWidth":"200"
  },
  {
  "objectID":"2",
  "printSize":"5",
  "frameStyle":"wood",
  "frameWidth":"500",
  "matColor":"red",
  "matWidth":"200"
}];

localStorage.setItem("cart", JSON.stringify(arrayOfObjects));
*/
let totalArtworks = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

//retrieving
let retrievedData = localStorage.getItem("cart");
let arrayOfObjects = JSON.parse(retrievedData);

//shows correct number of items in the cart
var temp = window.localStorage.getItem("cart");
if(temp) {
  var cartItems = JSON.parse(temp).length;
  document.getElementById("cart-link").innerHTML = "Cart" + " (" + cartItems + ")";
}


//shows empty message if no item is in the cart
if(localStorage.getItem("cart") === null)  else {
  drawPreviews();
  document.getElementById("checkout-button").onclick = ;
  
}

//draw Artwork previews
// - preview in its configurates frame
// - usual artwork information (title, artist, date) + textual description
// - price
async function drawPreviews() {
    let totalSum = 0;

    for(var i = 0; i < arrayOfObjects.length; i++) {
      var currentObject = arrayOfObjects[i];
      let currentObjectID = currentObject.objectID;
      let objectToTheID = totalArtworks + currentObjectID;
      let artwork = await fetch(objectToTheID).then(response => response.json());
      let price = frame.calculatePrice(currentObject.printSize, currentObject.frameStyle, currentObject.frameWidth, currentObject.matWidth);
      let priceInt = parseFloat(price.substring(2,price.length));
      totalSum = parseFloat(totalSum+priceInt);

      let textualDescription = text(currentObject.printSize, currentObject.frameStyle, currentObject.frameWidth, currentObject.matColor, currentObject.matWidth);
      function text(printSize, frameStyle, frameWidth, matColor, matWidth){
        let myPrintSize = "";
        if(printSize == 'S') {
          myPrintSize = "Small";
        } else if (printSize == 'M')  else if (printSize == 'L') {
          myPrintSize = "Large";
        }
        let myFrameWidth = parseFloat(frameWidth/10);
        let myMatWidth = parseFloat(matWidth/10);
        if(myMatWidth === 0) {
          return `${myPrintSize} print in a ${myFrameWidth} cm ${frameStyle} frame.`
        }

        return `${myPrintSize} print in a ${myFrameWidth} cm ${frameStyle} frame with a ${myMatWidth} cm ${matColor} mat.`;
      };
      console.log(artwork);
      let html = `<div class="cart-item">
        <div class="cart-preview" id="preview-container-${i}">
          <a href="config.html?objectID=${currentObjectID}&printSize=${currentObject.printSize}&frameStyle=${currentObject.frameStyle}&frameWidth=${currentObject.frameWidth}&matColor=${currentObject.matColor}&matWidth=${currentObject.matWidth}">
            <img class="cart-thumb" src="" id="preview-${i}" alt="">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${artwork.artistDisplayName}</span>
            <span class="title">${artwork.title}</span>,
            <span class="date">${artwork.objectDate}</span>
            <br><br>
            <span class="frame-description">${textualDescription}</span>
          </div>
          <div class="cart-price"><span id="price-0">${price}</span></div>
          <button class="cart-remove"></button>
        </div>
      </div>`;
      cart.insertAdjacentHTML("afterbegin", html);

      let img = document.getElementById(`preview-${i}`);
      img.src = artwork.primaryImageSmall;
      let container = document.getElementById(`preview-container-${i}`);

      img.addEventListener("load", function() {frame.render(img, container, currentObject.printSize, currentObject.frameStyle, currentObject.frameWidth, currentObject.matColor, currentObject.matWidth);});
    }

      Array.from(document.querySelectorAll(".cart-remove")).forEach((item, i) => {
        item.addEventListener("click",);
      });

    totalSum = parseFloat(totalSum).toFixed(2);
    document.getElementById("price-total").innerHTML = totalSum;
}

//show the total sum

