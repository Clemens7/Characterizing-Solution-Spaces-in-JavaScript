import * as COMMONS from "./commons.js";
import * as frame from "../frame.js";

const ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/";

window.update = update;
window.addToCart = addToCart;

window.onload = async function WindowLoad() {
  COMMONS.showCartItemsNumber();
  const urlParams = new URLSearchParams(window.location.search);
  const objectID = urlParams.get("objectID");
  const printSize = urlParams.get("printSize");
  const frameWidth = urlParams.get("frameWidth");
  const frameStyle = urlParams.get("frameStyle");
  const matWidth = urlParams.get("matWidth");
  const matColor = urlParams.get("matColor");

  if (printSize) 
  if (frameWidth) 
  if (frameStyle) 
  if (matWidth) 
  if (matColor) 

  if (!objectID) 
  const cachedImage = localStorage.getItem(objectID);
  const imgData = cachedImage   : await getImageData(objectID);

  //console.log(imgData);
  imgData.primaryImageSmall ? setThumbnail(imgData) ;
};

async function getImageData(objectID) {
  const res = await fetch(`${ENDPOINT}objects/${objectID}`);
  return res.json();
}

function setThumbnail(imgData) {
  const urlParams = new URLSearchParams(window.location.search);
  const img = document.getElementById("preview-image");
  img.setAttribute("src", imgData.primaryImageSmall);
  const container = document.getElementById("preview-container");
  const printSize = urlParams.get("printSize") || "M";
  const frameWidth = urlParams.get("frameWidth") || 40;
  const frameStyle = urlParams.get("frameStyle") || "natural";
  const matWidth = urlParams.get("matWidth") || 55;
  const matColor = urlParams.get("matColor") || "mint";

  const printSizes = frame.getPrintSizes(img);
  //console.log(printSizes);

  document.getElementById(
    "print-size-s-label"
  ).innerHTML = `Small<br />${printSizes.S[0]} × ${printSizes.S[1]} cm`;
  document.getElementById(
    "print-size-m-label"
  ).innerHTML = `Medium<br />${printSizes.M[0]} × ${printSizes.M[1]} cm`;
  document.getElementById(
    "print-size-l-label"
  ).innerHTML = `Large<br />${printSizes.L[0]} × ${printSizes.L[1]} cm`;

  frame.render(
    img,
    container,
    printSize,
    frameStyle,
    frameWidth,
    matColor,
    matWidth
  );

  const price = frame.calculatePrice(
    printSize,
    frameStyle,
    frameWidth,
    matWidth
  );

  document.getElementById("price").innerHTML = `€ ${price.toFixed(2)}`;
  document.getElementById("total-size").innerHTML = `${
    parseInt(printSizes[printSize][0]) + frameWidth / 10 + matWidth / 10
  } × ${
    parseInt(printSizes[printSize][1]) + frameWidth / 10 + matWidth / 10
  } cm`;

  const label = document.getElementById("image-label");
  label.set;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerHTML = imgData.artistDisplayName;

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.innerHTML = `${imgData.title}, `;

  const date = document.createElement("span");
  date.setAttribute("class", "date");
  date.innerHTML = imgData.objectDate;

  label.appendChild(artist);
  label.appendChild(title);
  label.appendChild(date);
}



async function update(field, value = null) {
  const urlParams = new URLSearchParams(window.location.search);
  if (field === "frameText") {
    if (document.getElementById("frameWidth").value > 5) 
    if (document.getElementById("frameWidth").value < 2) 
    document.getElementById("frameWidth").value = parseFloat(
      Math.ceil(document.getElementById("frameWidth").value * 10) / 10);
    document.getElementById("frameWidthR").value = document.getElementById(
      "frameWidth"
    ).value;
    urlParams.set(
      "frameWidth",
      document.getElementById("frameWidth").value * 10
    );
  } else if (field === "frameRange") 

  if (field === "matText") {
    if (document.getElementById("matWidth").value > 10) 
    if (document.getElementById("matWidth").value < 0) 
    document.getElementById("matWidth").value = parseFloat(
      Math.ceil(document.getElementById("matWidth").value * 10) / 10
    );
    document.getElementById("matWidthR").value = document.getElementById(
      "matWidth"
    ).value;
    urlParams.set("matWidth", document.getElementById("matWidth").value * 10);
  } else if (field === "matRange") 

  if (field === "printSize") {
    urlParams.set("printSize", value);
  }

  if (field === "frameStyle") {
    urlParams.set("frameStyle", value);
  }

  if (field === "matColor") {
    urlParams.set("matColor", value);
  }

  window.history.pushState(
    null,
    null,
    `/www/config.html?${urlParams.toString()}`
  );

  const objectID = urlParams.get("objectID");
  if (!objectID) 
  const imgData = await getImageData(objectID);

  imgData.primaryImageSmall ? setThumbnail(imgData) ;
}


