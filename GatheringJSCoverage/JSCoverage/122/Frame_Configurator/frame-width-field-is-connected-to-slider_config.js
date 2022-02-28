import * as Frame from '/frame.js';
import * as ArtworkCache from './artwork-cache.js';
import * as Cart from './cart.js';
import * as NavigationBar from './navigation-bar.js';


class Art {
  constructor(id, image, artist, title, date) {
    this.id = id;
    this.image = image;
    this.artist = artist;
    this.title = title;
    this.date = date;
  }
}

//-------------------------------------------------GLOBAL VARS--------------------------------------------------

let img = document.getElementById('preview-image');
let form = document.getElementById("config-form");
let submitBtn = document.querySelector("button[type='submit']");

let frameWidthSlider = document.querySelector("input[name='frameWidthR']");
let frameWidthText = document.querySelector("input[name='frameWidth']");
let matWidthSlider = document.querySelector("input[name='matWidthR']");
let matWidthText = document.querySelector("input[name='matWidth']");

let printSizeRadios = document.querySelectorAll("input[name='printSize']");
let frameStyleRadios = document.querySelectorAll("input[name='frameStyle']");


//--------------------------------------------LISTENERS& HANDLERS-----------------------------------------------
window.onload = function () {
  NavigationBar.displayCartSize();
};

document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL(document.location)).searchParams;

  if (params.has('objectID') && params.get('objectID').trim() !== "") {
    const objectID = params.get('objectID');
    retrieveImgData(objectID, params);
  }
})

submitBtn.addEventListener('click', )

form.addEventListener('submit', );

img.addEventListener('load', event => {

  setPrintSizeLabels();
  updateTotalSizeLabel();
  renderPreview();
})


frameWidthSlider.addEventListener("input", );


frameWidthText.addEventListener("change", function (e) {
  if (e.target.value != "") {
    frameWidthText.value = bringWithinRange(e.target.value, 2, 5);
    frameWidthSlider.value = bringWithinRange(e.target.value, 2, 5);

    updatePrice();
    updateTotalSizeLabel();
    renderPreview();
  }
});


matWidthSlider.addEventListener("input", );


matWidthText.addEventListener("change", );

for (var i = 0; i < printSizeRadios.length; i++) {
  printSizeRadios[i].addEventListener('change', );
}

for (var i = 0; i < frameStyleRadios.length; i++) {
  frameStyleRadios[i].onclick = addEventListener('change', function () {
    updatePrice();
    updateTotalSizeLabel();
    renderPreview();
  });
}


//-----------------------------------------RETRIEVE IMG & CURRENT CONFIG-------------------------------------------

async function retrieveImgData(imgID, params) {

  //update config
  if (params.has('printSize') ) 

  let currentArt;
  let cachedArt = ArtworkCache.retrieve(imgID);
  if (cachedArt)  else {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + imgID.trim());
    if (response.status === 404) 
    const rawdata = await response.json();
    console.log(rawdata);
    currentArt = new Art(rawdata.objectID, rawdata.primaryImageSmall, rawdata.artistDisplayName, rawdata.title, rawdata.objectDate);
    ArtworkCache.store(rawdata.objectID, currentArt);
  }

  //keep the current art in cache
  ArtworkCache.store("currentArt", currentArt);

  document.getElementById('preview-image').src = currentArt.image;
  document.getElementById('preview-image').alt = currentArt.title;
  document.getElementById('image-label').innerHTML =
      `<span class="artist">${currentArt.artist}</span>
            <span class="title">${currentArt.title}</span>,
            <span class="date">${currentArt.date}</span>`;

}








function setPrintSizeLabels() {
  let defaultId = 'print-size-';
  let options = ['s', 'm', 'l'];
  let values = Frame.getPrintSizes(document.getElementById('preview-image'));

  for (i = 0; i < options.length; i++) {
    let optionId = defaultId + options[i];
    let textLabel = options[i].slice(0,1).toUpperCase() + options[i].slice(1);
    let key = options[i].slice(0,1).toUpperCase();
    let wText = values[key][0];
    let hText = values[key][1];
    document.getElementById(optionId).labels[0].innerHTML = `${textLabel}<br>${wText} × ${hText} cm`;
  }
}


function getCurrentConfig() {
  let printSize = document.querySelector(`input[name=printSize]:checked`).value;
  let frameStyle = document.querySelector(`input[name=frameStyle]:checked`).value;
  let frameWidth = parseFloat(document.querySelector("input[name='frameWidth']").value);
  let matWidth = parseFloat(document.querySelector("input[name='matWidth']").value);
  let matColor = document.querySelector(`input[name=matColor]:checked`).value;

  return {
    printSize: printSize,
    frameStyle: frameStyle,
    frameWidth: frameWidth,
    matColor: matColor,
    matWidth: matWidth
  }

}

function updatePrice() {
  let current = getCurrentConfig();
  let currentPrice = parseFloat(Frame.calculatePrice(current.printSize, current.frameStyle, current.frameWidth * 10, current.matWidth * 10)).toFixed(2);
  document.getElementById('price').innerHTML = '€ ' + currentPrice;
}

function updateTotalSizeLabel() {
  let current = getCurrentConfig();
  let currentRadioSize = document.querySelector('input[name=printSize]:checked', '#segmented');
  let sizes = Frame.getPrintSizes(document.getElementById('preview-image'))[currentRadioSize.value];
  let wText = sizes[0] + current.frameWidth + current.matWidth;
  let hText = sizes[1] + current.frameWidth + current.matWidth;

  document.getElementById('total-size').innerHTML = `${wText} × ${hText} cm`;
}

function renderPreview() {
  let current = getCurrentConfig();
  let img = document.getElementById('preview-image');
  let container = document.getElementById('preview-container');
  Frame.render(img, container, current.printSize, current.frameStyle, current.frameWidth * 10, current.matColor, current.matWidth *  10);
}

function bringWithinRange(input, min, max) {
  let validInput = input;

  if (input < min)  else if (input > max)  else if (((input * 10) % 1) != 0) 
  return validInput;
}
