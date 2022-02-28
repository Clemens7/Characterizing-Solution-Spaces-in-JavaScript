
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
    frameWidthTxtInput.addEventListener("change", function () {
      frameWidthTxtInput.value = filterWidth(frameWidthTxtInput.value, 2, 5);
      frameWidthRangeInput.value = frameWidthTxtInput.value;
      frameWidth = frameWidthRangeInput.value * 10;
      updateState();
    });
    frameWidthRangeInput.addEventListener("change", );

    var matWidthTxtInput = document.getElementById("matWidth");
    var matWidthRangeInput = document.getElementById("matWidthR");
    matWidthTxtInput.addEventListener("change", function () {
      matWidthTxtInput.value = filterWidth(matWidthTxtInput.value, 0, 10)
      matWidthRangeInput.value = matWidthTxtInput.value;
      matWidth = matWidthTxtInput.value * 10;
      updateState();
    });
    matWidthRangeInput.addEventListener("change", );

    var previewImage = document.getElementById("preview-image");
    var previewContainer = document.getElementById("preview-container");
    var imageLabel = document.getElementById("image-label");

    var printSizeInputs = document.querySelectorAll("input[name=printSize]");
    for (let x of printSizeInputs) {
      x.addEventListener("change", function () {
        printSize = this.value;
        updateState();
      }, 0);
    }

    var frameStyleInputs = document.querySelectorAll("input[name=frameStyle]");
    for (let x of frameStyleInputs) {
      x.addEventListener("change", function () {
        frameStyle = this.value;
        updateState();
      }, 0);
    }

    var matColorInputs = document.querySelectorAll("input[name=matColor]");
    for (let x of matColorInputs) {
      x.addEventListener("change", function () {
        matColor = this.value;
        updateState();
      }, 0);
    }

    document.getElementById("addToCartBtn").addEventListener("click", );

    // end of event listeners -----------------------------------------------------------------------

    function setParameters() {

      if (urlParams.get('printSize') !== null)
        
      else
        printSize = 'M';

      if (urlParams.get('frameStyle') !== null)
        
      else
        frameStyle = "natural";

      if (urlParams.get('frameWidth') !== null)
        
      else
        frameWidth = 20;

      if (urlParams.get('matColor') !== null)
        
      else
        matColor = "mint";

      if (urlParams.get('matWidth') !== null)
        
      else
        matWidth = 55;

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

    function updateState() {

      render(previewImage, previewContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
      document.getElementById("price").innerHTML = "€ " + calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);
      document.getElementById('total-size').innerHTML = getFullDmensions();
      updateURL();
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

    function getFullDmensions() {
      let h = (printSizes[printSize][1] + frameWidth * 2 + matWidth * 2) / 100
      let w = (printSizes[printSize][0] + frameWidth * 2 + matWidth * 2) / 100
      h = Math.round(h * 100) / 100
      w = Math.round(w * 100) / 100
      return w + " x " + h + " cm";
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

      previewImage.onload = function () {
        printSizes = getPrintSizes(previewImage);
        render(previewImage, previewContainer, printSize, frameStyle, frameWidth, matColor, matWidth);

        document.getElementById("print-size-s-label").innerHTML = "Small<br>" + printSizes["S"][0] / 10 + " x " + printSizes["S"][1] / 10 + " cm";
        document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + printSizes["M"][0] / 10 + " x " + printSizes["M"][1] / 10 + " cm";
        document.getElementById("print-size-l-label").innerHTML = "Large<br>" + printSizes["L"][0] / 10 + " x " + printSizes["L"][1] / 10 + " cm";
        document.getElementById('total-size').innerHTML = getFullDmensions();
      }
      updateURL();
    }

    setParameters();

    retrieveArtworkInformation(objectID).then(artwork => {
      initiateArtworkPreview(artwork);
    });

  