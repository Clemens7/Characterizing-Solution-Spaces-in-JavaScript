
    import { render, calculatePrice, getPrintSizes } from "./frame.js";

    

    function prepareListeners() {

      let frameWidthInputs = document.getElementById("frame-width-fieldset").getElementsByTagName("input");
      for (const input of frameWidthInputs) {
        input.addEventListener("change", function () { updateFrameWidth(input.value) });
      }

      let frameStyleInputs = document.getElementById("frame-style-fieldset").getElementsByTagName("input");
      for (const input of frameStyleInputs) {
        input.addEventListener("click", updatePreview);
      }

      let matWidthInputs = document.getElementById("mat-width-fieldset").getElementsByTagName("input");
      for (const input of matWidthInputs) {
        input.addEventListener("change", );
      }

      let printSizeInputs = document.getElementById("print-size-fieldset").getElementsByTagName("input");
      for (const input of printSizeInputs) {
        input.addEventListener("click", updatePreview);
      }

      let matColorInputs = document.getElementById("mat-color-fieldset").getElementsByTagName("input");
      for (const input of matColorInputs) {
        input.addEventListener("click", updatePreview);
      }

      document.getElementById("config-form").addEventListener("submit", );
    }

    /**
     * simulates 3 calls to the museum API
     * stores responses into an array in localstorage
     * delete this once search has implemented its localstorage
     *
     * @returns {Promise<void>}
     */
    

    function getPrintSize() {
      const img = document.getElementById("preview-image");
      let printS = document.getElementById("print-size-s-label");
      let printM = document.getElementById("print-size-m-label");
      let printL = document.getElementById("print-size-l-label");
      const printSize = getPrintSizes(img);

      printS.innerHTML = `${printSize["S"][0] / 100} x ${printSize["S"][1] / 100} cm`;
      printM.innerHTML = `${printSize["M"][0] / 100} x ${printSize["M"][1] / 100} cm`;
      printL.innerHTML = `${printSize["L"][0] / 100} x ${printSize["L"][1] / 100} cm`;
    }

    function getTotalSize() {
      const size = getRadioValue(document.getElementsByName("printSize"));
      const frameWidth = document.getElementsByName("frameWidth")[0].value;
      const matWidth = document.getElementsByName("matWidth")[0].value;
      const img = document.getElementById("preview-image");
      const printSize = getPrintSizes(img);
      const totalWidth = printSize[size][0] / 100 + 2 * frameWidth + 2 * matWidth;
      const totalHeight = printSize[size][1] / 100 + 2 * frameWidth + 2 * matWidth;

      let total = document.getElementById("total-size");
      total.innerHTML = `${totalWidth} x ${totalHeight} cm`;
    }

    function getRadioValue(radio) {
      for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked)
          return radio[i].value;
      }}

    function updatePreview() {
      const img = document.getElementById('preview-image');
      const container = document.getElementById('preview-container');
      const frameStyle = getRadioValue(document.getElementsByName('frameStyle'));
      const frameWidth = document.getElementsByName('frameWidth')[0].value;
      const printSize = getRadioValue(document.getElementsByName('printSize'));
      const matColor = getRadioValue(document.getElementsByName('matColor'));
      const matWidth = document.getElementsByName('matWidth')[0].value;

      render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
      getPrintSize();
      getTotalSize();

      let price = document.getElementById("price");
      price.innerHTML = `€ ${calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`;
    }

    function updateFrameWidth(value) {
      let frameWidthFieldset = document.getElementById("frame-width-fieldset");
      let inputs = frameWidthFieldset.getElementsByTagName('input');
      if (value < 2)  else if (value > 5) 
      value = Math.round(value * 10) / 10
      for (let i = 0; i < inputs.length; ++i) {
        inputs[i].value = value.toString();
      }

      updatePreview();
    }

    

    function configureFrameConfig(urlParams) {
      if (urlParams.has('printSize')) 

      if (urlParams.has('frameWidth')) 

      if (urlParams.has('frameStyle')) 

      if (urlParams.has('matWidth')) 

      if (urlParams.has('matColor')) 
    }

    /**
     * Displays the page if an the queryParam '?objectID=' contains an ID of an object that is present in the localstorage
     * If not, it redirects back to the search page
     * optionally sets the printSize, frameWidth, frameStyle, matColor and matWidth based on query params
     */
    async function displayFrameConfig() {
      const urlParams = new URLSearchParams(window.location.search);
      let objectFound = false;
      if (urlParams.has('objectID')) {
        let artResponse = await getObject(urlParams.get('objectID'));
        if (artResponse.title != null) {
          if (artResponse.primaryImageSmall !== "") {
            objectFound = true;
            JSON.stringify(artResponse);
            var image = document.images[1];
            var downloadingImage = new Image();
            downloadingImage.onload = function () {
              image.src = this.src;
              updatePreview();
            };
            downloadingImage.src = artResponse.primaryImageSmall;
            JSON.stringify(artResponse);
            document.getElementById('image-label').innerHTML = artResponse.creditLine + " " + artResponse.artistDisplayName + " " + artResponse.title + " " + artResponse.objectDate;
            configureFrameConfig(urlParams);
          }
        }
      }
      if (!objectFound) 
    }

    


    let cartData = getCartData();
    // example product:
    // addProductToCart();
    prepareListeners();
    displayFrameConfig();
    updateNavigationText(cartData);
    updatePreview();

  