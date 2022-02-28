
    import { calculatePrice, render, getPrintSizes } from "./frame.js";
    import { addToCart } from "./cart.js";
    import { retrieveArtworkInformation } from "./artwork.js";

    const urlParams = new URLSearchParams(window.location.search);

    var objectID = urlParams.get('objectID');
    if (objectID === null)
      

    var printSizes;
    var printSize;
    var frameStyle;
    var frameWidth;
    var matColor;
    var matWidth;
    var basicHeight;
    var basicWidth;

    // start of event listeners -----------------------------------------------------------------------

    var frameWidthTxtInput = document.getElementById("frameWidth");
    var frameWidthRangeInput = document.getElementById("frameWidthR");
    frameWidthTxtInput.addEventListener("change", );
    frameWidthRangeInput.addEventListener("change", );

    var matWidthTxtInput = document.getElementById("matWidth");
    var matWidthRangeInput = document.getElementById("matWidthR");
    matWidthTxtInput.addEventListener("change", );
    matWidthRangeInput.addEventListener("change", );

    var previewImage = document.getElementById("preview-image");
    var previewContainer = document.getElementById("preview-container");
    var imageLabel = document.getElementById("image-label");

    var printSizeInputs = document.querySelectorAll("input[name=printSize]");
    for (let x of printSizeInputs) {
      x.addEventListener("change", , 0);
    }

    var frameStyleInputs = document.querySelectorAll("input[name=frameStyle]");
    for (let x of frameStyleInputs) {
      x.addEventListener("change", , 0);
    }

    var matColorInputs = document.querySelectorAll("input[name=matColor]");
    for (let x of matColorInputs) {
      x.addEventListener("change", , 0);
    }

    document.getElementById("addToCartBtn").addEventListener("click", );

    // end of event listeners -----------------------------------------------------------------------

    function setParameters() {

      if (urlParams.get('printSize') !== null)
        printSize = urlParams.get('printSize');

      if (urlParams.get('frameStyle') !== null)
        frameStyle = urlParams.get('frameStyle');

      if (urlParams.get('frameWidth') !== null)
        frameWidth = filterWidth(urlParams.get('frameWidth'), 20, 50);

      if (urlParams.get('matColor') !== null)
        matColor = urlParams.get('matColor');

      if (urlParams.get('matWidth') !== null)
        matWidth = filterWidth(urlParams.get('matWidth'), 0, 100);

      frameWidthTxtInput.value = frameWidth / 10;
      frameWidthRangeInput.value = frameWidth / 10;
      matWidthTxtInput.value = matWidth / 10
      matWidthRangeInput.value = matWidth / 10

      for (let x of printSizeInputs) {
        if (x.value === printSize)
          x.checked = true
        else
          x.checked = false;
      }

      for (let x of frameStyleInputs) {
        if (x.value === frameStyle)
          x.checked = true
        else
          x.checked = false;
      }

      for (let x of matColorInputs) {
        if (x.value === matColor)
          x.checked = true
        else
          x.checked = false;
      }
    }

    

    function updateURL() {
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;

        if (objectID !== null)
          newurl += `?objectID=${objectID}`;
        if (printSize !== null)
          newurl += `&printSize=${printSize}`;
        if (frameStyle !== null)
          newurl += `&frameStyle=${frameStyle}`;
        if (frameWidth !== null) {
          newurl += `&frameWidth=${frameWidth}`;
        }
        if (matColor !== null)
          newurl += `&matColor=${matColor}`;
        if (matWidth !== null) {
          newurl += `&matWidth=${matWidth}`;
        }

        if (window.location.href !== newurl){ //don't update  if this is aleady the current location
          window.history.pushState({ path: newurl }, '', newurl);
        }
      }
    }

    

    function filterWidth(x, min, max) {
      x = Math.round(x * 10) / 10 // step = 0.1
      if (x < min)
        
      else if (x > max)
        
      else
        return x;
    }

    function initiateArtworkPreview(artwork) {
      console.log(artwork.img);
      if (artwork.img == undefined)
        

      imageLabel.innerHTML = "<strong>" + artwork.artist + "</strong><br><i>" + artwork.title + "</i>, " + artwork.date;
      previewImage.src = artwork.img;
      printSizes = getPrintSizes(previewImage);

      document.getElementById("price").innerHTML = "€ " + calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);

      previewImage.onload = 
      updateURL();
    }

    setParameters();

    retrieveArtworkInformation(objectID).then(artwork => {
      initiateArtworkPreview(artwork);
    });

  