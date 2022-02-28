import * as frameFunc from './frame.js';

class Artwork {
  constructor(objectID, printSize, frameWidth, frameStyle, matWidth, matColor, price, totalSize) {
    this.objectID = objectID;
    this.printSize = printSize;
    this.frameWidth = frameWidth;
    this.frameStyle = frameStyle;
    this.matWidth = matWidth;
    this.matColor = matColor;
    this.price = price;
    this.totalsize = totalSize;
  }
}

let oid;
let params;
const artwork = new Artwork(0, "M", "4", "natural", "5.5", "mint");
const frametxt = document.getElementsByName("frameWidth")[0];
const mattxt = document.getElementsByName("matWidth")[0];
const frameslider = document.getElementsByName("frameWidthR")[0];
const matslider = document.getElementsByName("matWidthR")[0];
const form = document.getElementById("config-form");

mattxt.addEventListener('change', );
frametxt.addEventListener('change', );
frameslider.addEventListener('input', );
matslider.addEventListener('input', );
window.onload = function () {
  params = new URLSearchParams(window.location.search);
  if (params.has("objectID")) {
    oid = params.get("objectID");
  }
  if (params.has("frameStyle")) {
    document.getElementById("frame-style-" + params.get("frameStyle")).checked = true;
    artwork.frameStyle = params.get("frameStyle");
  }
  if (params.has("matColor")) {
    document.getElementById("mat-color-" + params.get("matColor")).checked = true;
    artwork.matColor = params.get("matColor");
  }
  if (params.has("printSize")) {
    document.getElementById("print-size-" + params.get("printSize").toLowerCase()).checked = true;
    artwork.printSize = params.get("printSize");
  }
  if (params.has("frameWidth")) {
    frametxt.value = params.get("frameWidth") / 10;
    frameslider.value = params.get("frameWidth") / 10;
  }
  if (params.has("matWidth")) {
    mattxt.value = params.get("matWidth") / 10;
    matslider.value = params.get("matWidth") / 10;
  }
  retrievePic(oid);
  let cart = document.getElementById('cart-link');
  let cartsize = JSON.parse(localStorage.getItem('cart')).length;
  if (cartsize > 0) 
};

function setValues(item) {
  document.getElementById("preview-image").src = item.primaryImageSmall;
  document.getElementById("image-label").innerHTML = "<b>" + item.title + "</b><br>" + item.artistDisplayName + " " + item.objectDate;
  let printsizes = frameFunc.getPrintSizes(document.getElementById("preview-image"));
  document.getElementById("print-size-s-label").innerHTML = "Small<br>" + (printsizes.S[0] / 10) + " &times; " + (printsizes.S[1] / 10) + " cm";
  document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + (printsizes.M[0] / 10) + " &times; " + (printsizes.M[1] / 10) + " cm";
  document.getElementById("print-size-l-label").innerHTML = "Large<br>" + (printsizes.L[0] / 10) + " &times; " + (printsizes.L[1] / 10) + " cm";
  updateArtwork();
}

function retrievePic() {
  if (localStorage.getItem(oid) !== null)  else {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + oid)
      .then(
        function (response) {
          if (response.status !== 200) 
          response.json().then(function (data) {
            if (data.primaryImageSmall === "") 
            localStorage.setItem(oid, JSON.stringify(data));
            setValues(data);
          })
        }
      );
  }
}

const printsize = document.getElementsByName("printSize");
for (let i = 0; i < printsize.length; i++) {
  printsize[i].addEventListener('change', );
}
const matrow = document.getElementsByClassName("mat-color-item");
for (let i = 0; i < matrow.length; i++) {
  matrow[i].children[0].addEventListener('change', );
}
const framerow = document.getElementsByClassName("frame-style-item");
for (let i = 0; i < framerow.length; i++) {
  framerow[i].children[0].addEventListener('change', );
}



function updateArtwork() {
  frameFunc.render(document.getElementById("preview-image"),
    document.getElementById("preview-container"),
    artwork.printSize,
    artwork.frameStyle,
    artwork.frameWidth,
    artwork.matColor,
    artwork.matWidth);
  artwork.price = frameFunc.calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);
  document.getElementById("price").innerText = `€ ${artwork.price.toFixed(2)}`;
  let size = frameFunc.getPrintSizes(document.getElementById("preview-image"));
  let totalsize = [0, 0];
  if (artwork.printSize === "S") 
  if (artwork.printSize === "M") { totalsize[0] = size.M[0]; totalsize[1] = size.M[1]; }
  if (artwork.printSize === "L") 
  totalsize[0] = (totalsize[0] / 10) + parseFloat(artwork.frameWidth) + parseFloat(artwork.matWidth);
  totalsize[1] = (totalsize[1] / 10) + parseFloat(artwork.frameWidth) + parseFloat(artwork.matWidth);
  artwork.totalsize = totalsize;
  document.getElementById("total-size").innerHTML = (totalsize[0]).toFixed(2) + " &times; " + (totalsize[1]).toFixed(2);
}

form.addEventListener('submit', )
