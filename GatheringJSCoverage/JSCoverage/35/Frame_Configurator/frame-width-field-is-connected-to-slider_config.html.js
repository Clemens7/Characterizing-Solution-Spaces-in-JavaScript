
    import { retrieveArtworkById } from './artworks.js';
    import { readCartFromCache, writeCartToCache } from './cache.js';
    import { Configuration } from './classes.js';
    import { updateCartLink } from './dom-helper.js';
    import * as Frame from './frame.js';

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = parseInt(urlParams.get('objectID'));
    let printSize = urlParams.get('printSize');
    let frameStyle = urlParams.get('frameStyle');
    let frameWidth = urlParams.get('frameWidth');
    let matColor = urlParams.get('matColor');
    let matWidth = urlParams.get('matWidth');
    let image = document.getElementById('preview-image');

    /*Slider*/
    const frameSliderRange = document.getElementById("frameSliderInput");
    const frameSliderNumber = document.getElementById("frameNumberInput");
    const matSliderRange = document.getElementById("matNumberRange");
    const matSliderNumber = document.getElementById("matNumberInput");

    const form = document.getElementById("config-form");
    form.addEventListener('submit', );

    updateCartLink();
    setDefaultValues();
    setFrameStyle();
    setMatColor();
    setSlider();
    retrieveArtwork(query);

    function setDefaultValues() {
      if (printSize === null) {
        printSize = "M";
      }
      if (frameStyle === null) {
        frameStyle = "natural";
      }
      if (frameWidth === null) {
        frameWidth = frameSliderNumber.value;
      }
      if (matColor === null) {
        matColor = "mint";
      }
      if (matWidth === null) {
        matWidth = matSliderNumber.value;
      }
    }

    async function retrieveArtwork(query) {
      if (query === null) 
      try {
        const artwork = await retrieveArtworkById(query);
        image.src = artwork.primaryImageSmall;

        image.addEventListener("load", () => {
          setPrintSizes();
          renderPreview();
          calcPrice();
          setTotalSize();
        });

        const artworkLabel = document.getElementById("image-label");
        artworkLabel.innerHTML = `<b>${artwork.artistDisplayName}</b><br>
        ${artwork.title},&nbsp;${artwork.objectDate}`;
      } 
    }

    function renderPreview() {
      const container = document.getElementById("preview-container");
      Frame.render(image, container, printSize, frameStyle, frameWidth * 10, matColor, matWidth * 10);
    }

    function calcPrice() {
      const price = document.getElementById("price");
      price.innerText = `€ ${Frame.calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10).toFixed(2)}`;
    }

    function setTotalSize() {
      const totalSize = document.getElementById("total-size");
      const size = Frame.calculateTotalSize(image, printSize, frameWidth, matWidth);
      totalSize.innerText = `${size[0]} × ${size[1]} cm`;
    }

    function setPrintSizes() {
      const printSizeArray = Frame.getPrintSizes(document.getElementById("preview-image"));
      setPrintLabels(printSizeArray);
    }

    function setPrintLabels(printSizeArray) {
      const smallLabel = document.getElementById("print-size-s-label");
      smallLabel.innerHTML = `Small<br>${printSizeArray.S[0] / 10} × ${printSizeArray.S[1] / 10} cm`;
      const mediumLabel = document.getElementById("print-size-m-label");
      mediumLabel.innerHTML = `Medium<br>${printSizeArray.M[0] / 10} × ${printSizeArray.M[1] / 10} cm`;
      const largeLabel = document.getElementById("print-size-l-label");
      largeLabel.innerHTML = `Large<br>${printSizeArray.L[0] / 10} × ${printSizeArray.L[1] / 10} cm`;
    }

    function setFrameStyle() {
      if (frameStyle !== null) {
        switch (frameStyle) {
          
          case "natural":
            document.getElementById("frame-style-natural").checked = true;
            break;
          
          
        }
      }
    }

    function setMatColor() {
      if (matColor !== null) {
        switch (matColor) {
          
          case "mint":
            document.getElementById("mat-color-mint").checked = true;
            break;
          
          
          
        }
      }
    }

    /* PrintSize render update*/
    const small = document.getElementById("print-size-s");
    const medium = document.getElementById("print-size-m");
    const large = document.getElementById("print-size-l");

    small.addEventListener('click', selectPrintSize(small, 'S'));
    medium.addEventListener('click', selectPrintSize(medium, 'M'));
    large.addEventListener('click', selectPrintSize(large, 'L'));

    function selectPrintSize(el, size) {
      return 
    }

    /* FrameStyle render update*/
    const classicFrame = document.getElementById("frame-style-classic");
    const naturalFrame = document.getElementById("frame-style-natural");
    const shabbyFrame = document.getElementById("frame-style-shabby");
    const elegantFrame = document.getElementById("frame-style-elegant");

    classicFrame.addEventListener('click', selectFrameStyle(classicFrame, "classic"));
    naturalFrame.addEventListener('click', selectFrameStyle(naturalFrame, "natural"));
    shabbyFrame.addEventListener('click', selectFrameStyle(shabbyFrame, "shabby"));
    elegantFrame.addEventListener('click', selectFrameStyle(elegantFrame, "elegant"));

    function selectFrameStyle(el, style) {
      return 
    }

    /* MatColor render update*/
    const ivoryMat = document.getElementById("mat-color-ivory");
    const mintMat = document.getElementById("mat-color-mint");
    const wineMat = document.getElementById("mat-color-wine");
    const indigoMat = document.getElementById("mat-color-indigo");
    const coalMat = document.getElementById("mat-color-coal");

    ivoryMat.addEventListener('click', selectMaterial(ivoryMat, "ivory"));
    mintMat.addEventListener('click', selectMaterial(mintMat, "mint"));
    wineMat.addEventListener('click', selectMaterial(wineMat, "wine"));
    indigoMat.addEventListener('click', selectMaterial(indigoMat, "indigo"));
    coalMat.addEventListener('click', selectMaterial(coalMat, "coal"));

    function selectMaterial(el, color) {
      return 
    }

    /*Slider*/
    frameSliderRange.addEventListener("input", updateFrameNumber);
    frameSliderNumber.addEventListener("change", updateFrameSlider);
    matSliderRange.addEventListener("input", updateMatNumber);
    matSliderNumber.addEventListener("change", updateMatSlider);

    function setSlider() {
      if (frameWidth !== null) {
        if (frameWidth < 2) 
        if (frameWidth > 5) 
      }
      setFrameSlider();
      if (matWidth !== null) {
        if (matWidth < 0) 
        if (matWidth > 10) 
      }
      setMatSlider();
    }

    function setFrameSlider() {
      frameSliderNumber.value = frameWidth;
      frameSliderNumber.setAttribute('value', frameWidth);
      frameSliderRange.value = frameWidth;
      frameSliderNumber.setAttribute('value', frameWidth);
    }

    function setMatSlider() {
      matSliderNumber.value = matWidth;
      matSliderNumber.setAttribute('value', matWidth);
      matSliderRange.value = matWidth;
      matSliderNumber.setAttribute('value', matWidth);
    }

    

    function updateFrameSlider() {
      if (frameSliderNumber.value >= 2 && frameSliderNumber.value <= 5) {
        frameSliderNumber.value = Math.round((frameSliderNumber.value) * 10) / 10;
        frameSliderRange.value = frameSliderNumber.value;
        frameWidth = frameSliderNumber.value;
      }
      updateAll();
    }

    

    

    function updateAll() {
      renderPreview();
      calcPrice();
      setTotalSize();
    }

    

    /* build json for cart*/
    const button = document.getElementById("add-to-cart-button");
    button.addEventListener("click", );
  