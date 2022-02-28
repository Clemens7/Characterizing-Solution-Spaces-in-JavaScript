
    import * as Frame from './frame.js';
    import * as Cache from './artwork-cache.js';
    import { Artwork } from './artwork.js';
    import * as CartHelper from './cartHelper.js';

    var objectID;
    var imageObject = document.getElementById("preview-image");  
    var printSize;
    var frameStyle;
    var frameWidth;
    var matColor;
    var matWidth;

    CartHelper.getCartItemNumber();


    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    };
  
    function round(value) {
      return Math.round(value * 10) / 10;
    }
  
    function renderFrame() {
      //update the image
      Frame.render(imageObject, document.getElementById("preview-container"), printSize, frameStyle, frameWidth, matColor, matWidth);
  
      //update corresponding print sizes
      document.getElementById('print-size-s-label').innerHTML = "Small<br>"+Frame.getPrintSizes(imageObject)['S'][0]/10 + " x " + Frame.getPrintSizes(imageObject)['S'][1]/10 + " cm";
      document.getElementById('print-size-m-label').innerHTML = "Medium<br>"+Frame.getPrintSizes(imageObject)['M'][0]/10 + " x " + Frame.getPrintSizes(imageObject)['M'][1]/10 + " cm";
      document.getElementById('print-size-l-label').innerHTML = "Large<br>"+Frame.getPrintSizes(imageObject)['L'][0]/10 + " x " + Frame.getPrintSizes(imageObject)['L'][1]/10 + " cm";
  
      //update total print size with mat and frame
      let totalWidth = (Frame.getPrintSizes(imageObject)[printSize][0] + 2*matWidth + 2*frameWidth)/10;
      let totalHeight = (Frame.getPrintSizes(imageObject)[printSize][1] + 2*matWidth + 2*frameWidth)/10;
      document.getElementById('total-size').innerHTML = totalWidth + " x " + totalHeight + " cm";
  
      //update total prize
      document.getElementById('price').innerHTML = "€ " + Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);
    }
  
    document.addEventListener('DOMContentLoaded', event => {
      //parse get params
      const params = (new URL(document.location)).searchParams;
      objectID = params.get('objectID');

      //redirect, if objectID is not set
      if(objectID == null) 

      printSize = params.has('printSize')  : 'M';
      frameStyle = params.has('frameStyle')  : 'natural';
      frameWidth = params.has('frameWidth')  : 40;
      matColor = params.has('matColor')  : 'mint';
      matWidth = params.has('matWidth')  : 55;
  
      //set elements according to get params
      document.getElementById('print-size-'+printSize.toLowerCase()).checked = true;
      document.getElementById('frame-style-'+frameStyle).checked = true;
      document.getElementById('mat-color-'+matColor).checked = true;
      document.getElementsByName('frameWidth')[0].value = round(clamp(frameWidth, 20, 50))/10;
      document.getElementsByName('frameWidthR')[0].value = round(clamp(frameWidth, 20, 50))/10;
      document.getElementsByName('matWidth')[0].value = round(clamp(matWidth, 0, 100))/10;
      document.getElementsByName('matWidth')[0].value = round(clamp(matWidth, 0, 100))/10;
  
      //get the artwork from the metmuseum api or from the cache
      getArtwork(objectID);
      
      //render the image after loading
      imageObject.onload = function() {
        renderFrame();
      }
    });
  
    async function getArtwork(objectID) {
      var artwork = Cache.retrieve(objectID);

      //if the artwork is not in the cache, load it from the API and store it in the cache
      if(!artwork) 

      //set the elements to the artwork attributes
      document.getElementById("preview-image").src = artwork.primaryImageSmall;
      document.getElementById("image-label").getElementsByClassName("artist")[0].innerHTML = artwork.artistDisplayName;
      document.getElementById("image-label").getElementsByClassName("title")[0].innerHTML = artwork.title;
      document.getElementById("image-label").getElementsByClassName("date")[0].innerHTML = artwork.objectDate;
    }
  
    //printSize change listener
    var printSizeRadios = document.querySelectorAll('input[type=radio][name="printSize"]');
    printSizeRadios.forEach(radio => radio.addEventListener('click', ));
  
    //frameWidth change listener
    var frameWidthSlider = document.getElementsByName('frameWidthR')[0];
    var frameWidthInput  = document.getElementsByName('frameWidth')[0];
    frameWidthSlider.addEventListener('change', );
    frameWidthInput.addEventListener('change', );
  
    //frameStyle change listener
    var frameStyleRadios = document.querySelectorAll('input[type=radio][name="frameStyle"]');
    frameStyleRadios.forEach(radio => radio.addEventListener('click', ));
  
    //matWidth change listener
    var matWidthSlider = document.getElementsByName('matWidthR')[0];
    var matWidthInput  = document.getElementsByName('matWidth')[0];
    matWidthSlider.addEventListener('change', );
    matWidthInput.addEventListener('change', );
  
    //matColor change listener
    var matColorRadios = document.querySelectorAll('input[type=radio][name="matColor"]');
    matColorRadios.forEach(radio => radio.addEventListener('click', ));

    //Submit listener
    var submitButton = document.getElementsByClassName("buy")[0];
    submitButton.addEventListener('click', );
  