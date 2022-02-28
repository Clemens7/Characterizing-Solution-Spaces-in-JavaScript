
    import * as Frame from './frame.js';

    //labels
    let image = document.querySelector('#preview-image');
    const label = document.querySelector('#image-label');

    //query parameters
    let params      = (new URL(document.location)).searchParams;
    let objectID    = parseInt(params.get("objectID"));
    let printSize   = params.get("printSize");
    if (printSize == null) {
      printSize = 'S';
    }
    let frameWidth  = parseInt(params.get("frameWidth")); 
    if (isNaN(frameWidth)) {
      frameWidth = 40;
    }
    let frameStyle  = params.get("frameStyle");
    if (frameStyle == null) {
      frameStyle = 'classic';
    }
    let matWidth    = parseInt(params.get("matWidth"));
    if (isNaN(matWidth)) {
      matWidth = 55;
    }
    let matColor    = params.get("matColor");
    if (matColor == null) {
      matColor = 'Ivory';
    }

    calculateTotalPrice();

    // redirect, if no objectID is given
    if (isNaN(objectID)) 

    function loadImage(input){

      // check if objectID already is cached in localStorage
      if (objectID in localStorage)  else {
        // if objectID is not present in the cache, we fetch the data and then save it in the local storage
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + input)
        .then((Response) => {
          if (Response.status !== 200) 
          return Response.json();
        }).then((data) => {
          image.src = data.primaryImageSmall; 
          label.innerHTML = '<div class="artist">' + data.artistDisplayName + '</div>' + data.title + ', ' + data.objectDate;
          var dataJSON = JSON.stringify(data);
          localStorage[objectID] = dataJSON;
        }).catch();
      }

      let key = 'cart';
      if (key in localStorage) 
    }
    loadImage(objectID);

    function pre_set(){
      if(objectID == null) else {
        document.querySelector('#object-id').value = objectID;
      }

      if(printSize != null){
        if(printSize == "S" ){
          var printSizeSelection = document.querySelector('#print-size-s');
        } 
        if(printSizeSelection != null){
          printSizeSelection.checked = true;
        }
      }

      if(!isNaN(frameWidth)){
        var realFrameWidth = frameWidth / 10;
        if (parseFloat(realFrameWidth) < 2)  else if (parseFloat(realFrameWidth) > 5) 
        document.querySelector('input[name="frameWidth"]').value = realFrameWidth;
        document.querySelector('input[name="frameWidthR"]').value = realFrameWidth;
      }

      if(frameStyle != null){
        if(frameStyle == "classic"){
          var frameStyleSelection = document.querySelector('#frame-style-classic');
        }
        if(frameStyleSelection != null){
          frameStyleSelection.checked = true;
        }
      }

      if(!isNaN(matWidth)){
        var realMatWidth = matWidth / 10;
        if (realMatWidth < 0)  else if (realMatWidth > 10) 
        document.querySelector('input[name="matWidth"]').value = realMatWidth;
        document.querySelector('input[name="matWidthR"]').value = realMatWidth;
      }
  
      if(matColor != null){
        if(matColor == "ivory") else if(matColor == "mint") else if(matColor == "wine") else if(matColor == "indigo") else if(matColor == "coal")
        if(matColorSelection != null)
      }

    }
    pre_set();

    function linkSlider(slider){
      var text_box = document.querySelector('#'+slider.getAttribute("link-to"));

      //needed for comparing
      var min = parseInt(text_box.min);
      var max = parseInt(text_box.max);

      //make both the same
      text_box.value = slider.value;

      //change textbox when slider changes
      slider.addEventListener("change", );

      //change slider when textbox changes
      text_box.addEventListener("change", );

    }
    document.querySelectorAll('input[type="range"]').forEach(element => linkSlider(element));
    
    function calculateTotalPrice(){
      let totalPrice = document.getElementById('price');
      let notFixedPrice = Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
      console.log("not fixed: " + notFixedPrice);
      totalPrice.textContent = "€ " + notFixedPrice.toFixed(2);
    }

    // render image with frame
    function renderImage() {
      let previewContainer = document.getElementById('preview-container');
      Frame.render(image, previewContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    }

    image.addEventListener('load', renderImage);

    // Add selected artwork with its configuration to the shopping cart and redirect to the cart
    

    let configForm = document.getElementById('config-form');
    configForm.addEventListener('submit', addAndProceedToCart);

    // functions for events on changing of form
    
    
    
    
    

    // add event listeners for changing of form
    document.getElementById('print-size-s').addEventListener('change', changePrintSize);
    document.getElementById('print-size-m').addEventListener('change', changePrintSize);
    document.getElementById('print-size-l').addEventListener('change', changePrintSize);

    document.getElementsByName('frameWidthR')[0].addEventListener('change', changeFrameWidth);
    document.getElementsByName('frameWidth')[0].addEventListener('change', changeFrameWidth);

    document.getElementById('frame-style-classic').addEventListener('change', changeFrameStyle);
    document.getElementById('frame-style-natural').addEventListener('change', changeFrameStyle);
    document.getElementById('frame-style-shabby').addEventListener('change', changeFrameStyle);
    document.getElementById('frame-style-elegant').addEventListener('change', changeFrameStyle);

    document.getElementsByName('matWidthR')[0].addEventListener('change', changeMatWidth);
    document.getElementsByName('matWidth')[0].addEventListener('change', changeMatWidth);

    document.getElementById('mat-color-ivory').addEventListener('change', changeMatColor);
    document.getElementById('mat-color-mint').addEventListener('change', changeMatColor);
    document.getElementById('mat-color-wine').addEventListener('change', changeMatColor);
    document.getElementById('mat-color-indigo').addEventListener('change', changeMatColor);
    document.getElementById('mat-color-coal').addEventListener('change', changeMatColor);

  