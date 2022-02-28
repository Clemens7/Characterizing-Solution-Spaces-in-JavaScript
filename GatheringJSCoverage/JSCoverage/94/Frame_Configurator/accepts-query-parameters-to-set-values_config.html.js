
    import artmartAPI from "./artmartAPI.js";
    import {addToCart, retrieveCart} from "./artmart-cache.js";
    import {getPrintSizes, render, calculatePrice} from "./frame.js"
  
    const form = document.querySelector("#config-form");
  
    document.addEventListener("DOMContentLoaded", event=>loadObject());
    form.addEventListener('submit', );
  
    var imgContainer = document.getElementById('preview-container');
    var imgElement = document.getElementById('preview-image');
    var artObject;
    var printSize = 'M';
    var frameStyle = 'natural';
    var frameWidth = 40;
    var matColor = 'mint';
    var matWidth = 55;

    async function loadObject(){
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get("objectID");
      if(urlParams.has("printSize")) {
        const value = urlParams.get("printSize");
        if(value == 'S' || value == 'M' ) {
          printSize = value;
          var printSizeRadio = document.querySelectorAll('input[name="printSize"]');
          for( var i=0; i<printSizeRadio.length; ++i){
            printSizeRadio[i].checked = printSizeRadio[i].value == printSize;
          }
        }
      }
      if(urlParams.has("frameStyle")) {
        const value = urlParams.get("frameStyle");
        const validStyles = ["classic", "natural", "shabby", "elegant"];
        if(validStyles.includes(value) == true){
          frameStyle = value;
          var frameStyleRadio = document.querySelectorAll('input[name="frameStyle"]');
          for(var i = 0; i < frameStyleRadio.length; ++i){
            frameStyleRadio[i].checked = frameStyleRadio[i].value == frameStyle;
          }
        }
      }
      if(urlParams.has("frameWidth")) {
        const value = urlParams.get("frameWidth");
        if(!isNaN(value) && value >= 20 && value <= 50) {
          frameWidth = Math.round(Number(value));
          var frameWidthInputs = document.querySelectorAll('input[name="frameWidth"], input[name="frameWidthR"]');
          for(var i = 0; i < frameWidthInputs.length; ++i) {
            frameWidthInputs[i].value = frameWidth / 10;
          }
        }
      }
      if(urlParams.has("matColor")) {
        const value = urlParams.get("matColor");
        const validColors = ["ivory", "mint", "wine", "indigo", "coal"];
        if(validColors.includes(value)) {
          matColor = value;
          var matColorRadio = document.querySelectorAll('input[name="matColor"]');
          for(var i = 0; i < matColorRadio.length; ++i) {
            matColorRadio[i].checked = matColorRadio[i].value == matColor;
          }
        }
      }
      if(urlParams.has("matWidth")) {
        const value = urlParams.get("matWidth");
        if(!isNaN(value) && value >= 0.0 && value <= 100) {
          matWidth = Math.round( Number(value));
          var matWidthInputs = document.querySelectorAll('input[name="matWidth"], input[name="matWidthR"]');
          for(var i = 0; i < matWidthInputs.length; ++i ){
            matWidthInputs[i].value = matWidth / 10;
          }
        }
      }

      const cart = retrieveCart();
      if(!(cart===undefined) ) 
  
      if(idParam) {
          artObject = await artmartAPI.getObject(idParam);
          if(artObject && artObject.objectID){
              document.getElementById('image-label').innerHTML = "<b>" + artObject.artistDisplayName + "</b><br><i>" + artObject.title + "</i>" + artObject.objectDate;
              imgElement.alt = artObject.title;
              imgElement.onload = function() {
                
                var sizes = getPrintSizes(imgElement);
                var smallLabel = document.getElementById('print-size-s-label');
                smallLabel.innerText = smallLabel.innerText.replace('0 × 0 cm', sizes['S'][0] / 10 + ' x ' + sizes['S'][1] / 10 +' cm');
                
                var mediumLabel = document.getElementById('print-size-m-label');
                mediumLabel.innerText = mediumLabel.innerText.replace('0 × 0 cm', sizes['M'][0] / 10 + ' x ' + sizes['M'][1] / 10 + ' cm');
                
                var largeLabel = document.getElementById('print-size-l-label');
                largeLabel.innerText = largeLabel.innerText.replace('0 × 0 cm', sizes['L'][0] / 10 + ' x ' + sizes['L'][1] / 10+ ' cm');
                
                update();
              };
              
              imgElement.src = artObject.primaryImageSmall;
              return;
          }
      }}
  
    
  
    
  
    function update()
    {  
      render(imgElement, imgContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
      const price =  calculatePrice(printSize, frameStyle, frameWidth, matWidth); 
      document.getElementById("price").innerText = "€ " + price.toFixed(2);
      const sizes = getPrintSizes(imgElement);
      const size = sizes[printSize];
      const width = (Number(size[0]) + Number(frameWidth) + Number(matWidth)) / 10;
      const height = (Number(size[1]) + Number(frameWidth)  + Number(matWidth)) / 10;
      document.getElementById("total-size").innerText =  width.toFixed(1) + " x " + height.toFixed(1) + " cm"
    }
  
    // frame size
    var frameSlider = document.getElementById("frameSlider");
    var frameInput = document.getElementById("frameNumber");
    frameSlider.oninput = 
    frameInput.onchange = 
    
    // mat 
    var matSlider = document.getElementById("matSlider");
    var matInput = document.getElementById("matNumber");
    matSlider.oninput = 
    matInput.onchange = 
  
  
    var printSizeRadio = document.querySelectorAll('input[name="printSize"]');
    for( var i=0; i<printSizeRadio.length; ++i){
      printSizeRadio[i].addEventListener("change", );
    }
  
    var frameStyleRadio = document.querySelectorAll('input[name="frameStyle"]');
    for( var i=0; i<frameStyleRadio.length; ++i){
      frameStyleRadio[i].addEventListener("change", );
    }
  
    var matColorRadio = document.querySelectorAll('input[name="matColor"]');
    for( var i=0; i<matColorRadio.length; ++i){
      matColorRadio[i].addEventListener("change", );
    }
    
  