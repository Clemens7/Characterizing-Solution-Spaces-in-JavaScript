
  import * as Frame from './frame.js';

  function updateFrame(){
    //create preview of painting incl. frame and material
    Frame.render( img, img_container, printSize, frameStyle, frameWidth*10, matColor, matWidth*10 );

    //calculate and write price
    const price = document.getElementById('price');
    const price_value =  Frame.calculatePrice(printSize, frameStyle, frameWidth*10, matWidth*10);
    price.innerHTML = "€ " + price_value.toFixed(2);

    //calculate and write total Size
    const totalSize = document.getElementById('total-size');
    let x = Frame.getPrintSizes(img);
    totalSize.innerHTML = (x[printSize][0] + frameWidth*10 + matWidth*10)/10 + " x " + (x[printSize][1] + frameWidth*10 + matWidth*10)/10 + " cm";
    //const printSizes = Frame.getPrintSizes(img);
    //totalSize.innerHTML = Frame.calculateTotalSize([printSizes[printSize][0]/10, printSizes[printSize][1]/10], frameWidth, matWidth);
  }

  /**********************************************/
  /*********** Read query parameter *************/
  /**********************************************/
  function readDefault( key, def ) {
    let urlParams = new URLSearchParams(window.location.search);
    let res = urlParams.get(key);
    if( res ) return res;
    else      return def;
  }

  var objectID   = readDefault('objectID', 0);
  var printSize  = readDefault('printSize','M');
  var frameStyle = readDefault('frameStyle','natural');
  var frameWidth = readDefault('frameWidth',40)/10;
  var matColor   = readDefault('matColor','mint');
  var matWidth   = readDefault('matWidth',55)/10;

  /**********************************************/
  /********** DOMContentLoaded Event ************/
  /**********************************************/
  document.addEventListener("DOMContentLoaded", function() {
    let width;

    if( frameWidth )
    {
      width = document.querySelector('#frameWidthR');
      width.value = minMaxRound(2,5,frameWidth);
      width = document.querySelector('#frameWidthN');
      width.value = minMaxRound(2,5,frameWidth);
    }

    if( matWidth )
    {
      width = document.querySelector('#matWidthR');
      width.value = minMaxRound(0,10,matWidth);
      width = document.querySelector('#matWidthN');
      width.value = minMaxRound(0,10,matWidth);
    }

    for( let sizes of document.getElementsByName("printSize") ) {
      if( sizes.value === printSize ) {
        sizes.checked = true;
      }
    }

    for( let frames of document.getElementsByName("frameStyle") ) {
      if( frames.value === frameStyle ) {
        frames.checked = true;
      }
    }
    for( let mats of document.getElementsByName("matColor") ) {
      if( mats.value === matColor ) {
        mats.checked = true;
      }
    }

    let cart_items = JSON.parse(localStorage.getItem("cart"));
    if( cart_items ) 
  });

  /**********************************************/
  /********* Load requested painting ************/
  /**********************************************/
  var img = document.getElementById('preview-image');
  var img_container = document.getElementById("preview-container");
  //as soon as image is loaded, write correct sizes for calculation and update Frame (incl. price and total size)
  img.onload = function() {
    writeCorrectSize( Frame.getPrintSizes(img) );
    updateFrame();
  };

  async function retrievePainting(objectID) {
    //check if same onjectID is already loaded, if not reaquest object and save it in localStorage in JSON format
    if( !localStorage.getItem('ObjectID')  ) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const tmp_rawData = await response.json();
      let rawStr =
              "{\"objectID\":\"" + tmp_rawData.objectID + "\"" +
              ", \"primaryImageSmall\":\"" + tmp_rawData.primaryImageSmall + "\"" +
              ", \"message\":\"" + tmp_rawData.message + "\"" +
              ", \"artistDisplayName\":\"" + tmp_rawData.artistDisplayName + "\"" +
              ", \"title\":\"" + tmp_rawData.title + "\"" +
              ", \"objectDate\":\"" + tmp_rawData.objectDate + "\"}";

      localStorage.setItem('rawData', rawStr);
      localStorage.setItem('ObjectID', tmp_rawData.objectID );
    }

    console.log(JSON.parse(localStorage.getItem('rawData')));
    return JSON.parse(localStorage.getItem('rawData'));
  }

  function writePaintingLable( painting ) {
    let img_label = document.getElementById('image-label');
    img_label.innerHTML = "<b>" + painting.artistDisplayName + "</b><br>" + painting.title + " " + painting.objectDate;
  }

  //load painting from API and do all jobs which can be done before image is loaded
  async function loadPainting() {
    if( !objectID ) 
    const painting = await retrievePainting(objectID);
    if( painting.message === "ObjectID not found" ) 

    img.src = painting.primaryImageSmall;
    writePaintingLable( painting );
  }

  loadPainting();

  /**********************************************/
  /***** write possible sizes for painting ******/
  /**********************************************/
  function writeCorrectSize( correctSize ) {
    var sizeElementS = document.getElementById("print-size-s-label");
    sizeElementS.innerHTML = "Small<br>" + correctSize.S[0]/10 + " x " + correctSize.S[1]/10 + " cm";
    var sizeElementM = document.getElementById("print-size-m-label");
    sizeElementM.innerHTML = "Medium<br>" + correctSize.M[0]/10 + " x " + correctSize.M[1]/10 + " cm";
    var sizeElementL = document.getElementById("print-size-l-label");
    sizeElementL.innerHTML = "Large<br>" + correctSize.L[0]/10 + " x " + correctSize.L[1]/10 + " cm";
  }

  /**********************************************/
  /*** Frame- and Material-width configurator ***/
  /**********************************************/
  function minMaxRound(min,max,val){
    if( val < min ){
      val = min;
    } else if ( val > max ){
      val = max;
    } else if ( (val*100)%10 ){
      val = Math.round(val*10)/10;
    }
    return val;
  }

  const frameWidthR = document.querySelector('#frameWidthR');
  const frameWidthN = document.querySelector('#frameWidthN');
  frameWidthR.addEventListener("change",);
  frameWidthN.addEventListener("change",);

  const matWidthR = document.querySelector('#matWidthR');
  const matWidthN = document.querySelector('#matWidthN');
  matWidthR.addEventListener("change",);
  matWidthN.addEventListener("change",function(){
    matWidth = minMaxRound(0,10,matWidthN.value);
    matWidthN.value = matWidth;
    matWidthR.value = matWidth;
    updateFrame();
  });

  const allPrintSizes = document.getElementsByName("printSize");
  allPrintSizes[0].addEventListener('change', );
  allPrintSizes[1].addEventListener('change', );
  allPrintSizes[2].addEventListener('change', );

  const allFrameStyles = document.getElementsByName("frameStyle");
  allFrameStyles[0].addEventListener('change', );
  allFrameStyles[1].addEventListener('change', );
  allFrameStyles[2].addEventListener('change', );
  allFrameStyles[3].addEventListener('change', );

  const allMatColors = document.getElementsByName("matColor");
  allMatColors[0].addEventListener('change', );
  allMatColors[1].addEventListener('change', );
  allMatColors[2].addEventListener('change', );
  allMatColors[3].addEventListener('change', );
  allMatColors[4].addEventListener('change', );

  /**********************************************/
  /************* Add to Cart button *************/
  /**********************************************/
  

  document.getElementById("buy").addEventListener("click", );

  /**********************************************/
