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

mattxt.addEventListener('change', () => {
  mattxt.value = Math.round(mattxt.value * 10) / 10;
  if (mattxt.value < 0) 
  if (mattxt.value > 10) 
  matslider.value = mattxt.value;
  artwork.matWidth = mattxt.value;
  updateArtwork();
});
frametxt.addEventListener('change', () => {
  frametxt.value = Math.round(frametxt.value * 10) / 10;
  if (frametxt.value < 2) 
  if (frametxt.value > 5) 
  frameslider.value = frametxt.value;
  artwork.frameWidth = frametxt.value;
  updateArtwork();
});
frameslider.addEventListener('input', );
matslider.addEventListener('input', );
window.onload = function () {
  params = new URLSearchParams(window.location.search);
  if (params.has("objectID")) {
    oid = params.get("objectID");
  }
  if (params.has("frameStyle")) 
  if (params.has("matColor")) 
  if (params.has("printSize")) 
  if (params.has("frameWidth")) 
  if (params.has("matWidth")) 
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
  printsize[i].addEventListener('change', () => {
    updatePrintSize();
    updateArtwork();
  });
}
const matrow = document.getElementsByClassName("mat-color-item");
for (let i = 0; i < matrow.length; i++) {
  matrow[i].children[0].addEventListener('change', () => {
    updateMatColor();
    updateArtwork();
  });
}
const framerow = document.getElementsByClassName("frame-style-item");
for (let i = 0; i < framerow.length; i++) {
  framerow[i].children[0].addEventListener('change', () => {
    updateFrameStyle();
    updateArtwork();
  });
}
function updateFrameStyle() {
  for (let i = 0; i < framerow.length; i++) {
    if (framerow[i].children[0].checked) {
      artwork.frameStyle = framerow[i].children[0].value;
    }
  }
}
function updatePrintSize() {
  for (let i = 0; i < printsize.length; i++) {
    if (printsize[i].checked) {
      artwork.printSize = printsize[i].value;
      console.log(artwork.printSize);
    }
  }
}
function updateMatColor() {
  for (let i = 0; i < matrow.length; i++) {
    if (matrow[i].children[0].checked) {
      artwork.matColor = matrow[i].children[0].value;
    }
  }
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
  if (artwork.printSize === "S") { totalsize[0] = size.S[0]; totalsize[1] = size.S[1]; }
  if (artwork.printSize === "M") { totalsize[0] = size.M[0]; totalsize[1] = size.M[1]; }
  if (artwork.printSize === "L") { totalsize[0] = size.L[0]; totalsize[1] = size.L[1]; }
  totalsize[0] = (totalsize[0] / 10) + parseFloat(artwork.frameWidth) + parseFloat(artwork.matWidth);
  totalsize[1] = (totalsize[1] / 10) + parseFloat(artwork.frameWidth) + parseFloat(artwork.matWidth);
  artwork.totalsize = totalsize;
  document.getElementById("total-size").innerHTML = (totalsize[0]).toFixed(2) + " &times; " + (totalsize[1]).toFixed(2);
}

form.addEventListener('submit', )
