
    import * as Frame from './frame.js';
    import * as Common from './common.js';

    // FUNCTIONS
    function initializeArtwork() {
      let cachedArtwork = localStorage.getItem("met" + objectID);
      if(cachedArtwork  !== null) {
        let elements = cachedArtwork.split(";");
        let artist = elements[0];
        let title =  elements[1];
        let date =   elements[2];
        let imgUrl = elements[3];

        setArtwork(artist, title, date, imgUrl);
      }
    }

    

    

    function setArtwork(artist, title, date, imgUrl) {
      document.getElementById("preview-image").src = imgUrl;
      document.getElementById("image-label").innerHTML = `<span class="artist">${artist}</span><span class="title">${title}, </span>${date}`;
      updateConfigurator();
    }

    function updateConfigurator() {
      render();
      let sizes = Frame.getPrintSizes(document.getElementById("preview-image"));
      document.getElementById("print-size-s-label").innerHTML = `Small<br>${sizes.S[0]} × ${sizes.S[1]} cm`
      document.getElementById("print-size-m-label").innerHTML = `Medium<br>${sizes.M[0]} × ${sizes.M[1]} cm`
      document.getElementById("print-size-l-label").innerHTML = `Large<br>${sizes.L[0]} × ${sizes.L[1]} cm`
    }

    function render() {
      Frame.render(
        document.getElementById("preview-image"),
        document.getElementById("preview-container"),
        document.querySelector('input[name = "printSize"]:checked').value,
        document.querySelector('input[name = "frameStyle"]:checked').value,
        document.querySelector('input[name = "frameWidth"]').value,
        document.querySelector('input[name = "matColor"]:checked').value,
        document.querySelector('input[name = "matWidth"]').value
      );
    }

    function correctWidth(min, max, value) {  // in mm
      if (value || value === 0) 
      return value;
    }

    function correctFrame(value) {
      return correctWidth(20, 50, value);
    }

    function correctMat(value) {
      return correctWidth(0, 100, value);
    }

    function setRadio(name, value) {
      // way shorter than switching on value for every single radio button group
      for (const element of document.getElementsByName(name)) {
        if (element.value === value) 
      }
    }

    function setValue(numberField, rangeSlider, value) {
      // names should only show up once, but in case they don't,
      // the loops just adjusts all of them.
      if (value) 
    }

    function setPrice() {
      const printSize = document.querySelector('input[name = "printSize"]:checked').value;
      const frameStyle = document.querySelector('input[name = "frameStyle"]:checked').value;
      const frameWidth = document.querySelector('input[name = "frameWidth"]').value * 10.0;
      const matWidth = document.querySelector('input[name = "matWidth"]').value * 10.0;

      const price = Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
      const priceTag = document.getElementById("price");
      priceTag.innerHTML = `€ ${price.toFixed(2)}`
    }

    

    function setConfigurationListeners() {
      for (const printSizeTag of document.getElementsByName("printSize")) {
        printSizeTag.addEventListener("change", );
      }
      for (const frameStyleTag of document.getElementsByName("frameStyle")) {
        frameStyleTag.addEventListener("change", );
      }
      for (const matColorTag of document.getElementsByName("matColor")) {
        matColorTag.addEventListener("change", updateConfigurator)
      }
      document.getElementsByName("frameWidth")[0].addEventListener("change", );
      document.getElementsByName("matWidth")[0].addEventListener("change", );
      document.getElementsByName("frameWidthR")[0].addEventListener("change", );
      document.getElementsByName("matWidthR")[0].addEventListener("change", );
    }

    

    function setWidthListener(original, copy, correctionFunction) {
      for (const originalElement of document.getElementsByName(original)) {
        for (const copyElement of document.getElementsByName(copy)) {
          originalElement.addEventListener("change", );
        }
      }
    }

    function setDoubleListeners(og, cp, corr) {
      setWidthListener(og, cp, corr);
      setWidthListener(cp, og, corr);
    }

    // MAIN

    // extract query parameters
    let url = new URL(window.location);
    let objectID = url.searchParams.get("objectID");
    let printSize = url.searchParams.get("printSize");
    let frameStyle = url.searchParams.get("frameStyle");
    let frameWidth = url.searchParams.get("frameWidth");
    let matColor = url.searchParams.get("matColor");
    let matWidth = url.searchParams.get("matWidth");

    // do value presetting
    Common.setCartItemNumber();
    setRadio("printSize", printSize);
    setRadio("frameStyle", frameStyle);
    setRadio("matColor", matColor);
    setValue("frameWidth", "frameWidthR", correctFrame(frameWidth));
    setValue("matWidth", "matWidthR", correctMat(matWidth));
    setPrice();

    //set event listeners
    setDoubleListeners("frameWidth", "frameWidthR", correctFrame);
    setDoubleListeners("matWidth", "matWidthR", correctMat);
    setConfigurationListeners();
    document.getElementById('config-form').addEventListener("submit", addToCart);

    // do API call for artwork
    let objectIDRegex = /^[0-9]+$/;

    if ((objectID === null) || (!objectIDRegex.test(objectID))) 

    initializeArtwork();

  