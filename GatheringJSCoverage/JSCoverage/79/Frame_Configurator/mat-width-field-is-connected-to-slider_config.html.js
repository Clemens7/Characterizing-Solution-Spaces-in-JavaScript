
    import * as Frame from './frame.js';
    import { Artwork } from './artwork.js';
    import * as ArtworkAPI from './artwork-api.js';
    import * as Cart from './cart.js';
 
    var oid;
    var printSize;
    var frameWidth;
    var frameStyle;
    var matWidth;
    var matStyle;
    var IMAGE;
    var thumbnail;
    const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    const LABEL = document.getElementById('image-label');
    const CONTAINER = document.getElementById('preview-container');
 
    const cartlink = document.getElementById('cart-link');
    var cartAmount = 0;
    try{
      cartAmount = JSON.parse(localStorage['cart']).length;
    }catch(e){};
    cartlink.innerText= 'Cart (' + cartAmount +')';
 
    var object = getImage().then(data => {doFun(data);}).catch();
 
    var sliderFrame = document.querySelector('input[name=frameWidthR]');
    var frameBox = document.querySelector('input[name=frameWidth]');
 
    sliderFrame.addEventListener('input', sliderChangeFrame);
    frameBox.addEventListener('change', boxChangeFrame);
 
    var sliderMat = document.querySelector('input[name=matWidthR]');
    var matBox = document.querySelector('input[name=matWidth]');
 
    sliderMat.addEventListener('input', sliderChangeMat);
    matBox.addEventListener('change', boxChangeMat);
 
    function doFun(data){
      oid = data.objectid;
      thumbnail = data.thumbnail;
      if(!oid)
      frameSize();
      setParameteres(data);
      IMAGE.addEventListener('load', ()=> Frame.render(IMAGE, CONTAINER, printSize, frameStyle, frameWidth, matStyle, matWidth));
    }
 
    async function getImage () {
      const queryString = window.location.search;
      const urlParam = new URLSearchParams(queryString);
      var objId = urlParam.get('objectID');
      let data = await ArtworkAPI.getSingleImageData(objId);
      createElement(data);
 
      return data;
    }
    
    function createElement(data){
      const image = document.getElementById('preview-image');
      image.setAttribute('src', `${data.thumbnail}`);
      image.setAttribute('alt', `${data.title}`);
      ArtworkAPI.createMuseumLabel(data,LABEL);
      IMAGE = document.getElementById('preview-image');
    }
 
    const x = document.querySelector('form');
    x.addEventListener('change', setParameteres);
    x.addEventListener('change', updateImage);
 
    function updateImage(){
      Frame.render(IMAGE, CONTAINER, printSize, frameStyle, frameWidth, matStyle, matWidth);
    }
 
    function setParameteres(){
      var s = document.getElementById('print-size-s').checked;
      var m = document.getElementById('print-size-m').checked;
      var l = document.getElementById('print-size-l').checked;
      if(s === true) 
      if(m === true) printSize = 'M';
      if(l === true) 
     
      var classic = document.getElementById('frame-style-classic').checked;
      var natural = document.getElementById('frame-style-natural').checked;
      var shabby = document.getElementById('frame-style-shabby').checked;
      var elegant = document.getElementById('frame-style-elegant').checked;
      if(classic === true) 
      if(natural === true) frameStyle = 'natural';
      if(shabby === true) 
      if(elegant === true) 
     
      var ivory = document.getElementById('mat-color-ivory').checked;
      var mint = document.getElementById('mat-color-mint').checked;
      var wine = document.getElementById('mat-color-wine').checked;
      var indigo = document.getElementById('mat-color-indigo').checked;
      var coal = document.getElementById('mat-color-coal').checked;
      if(ivory === true) 
      if(mint === true) matStyle = 'mint';
      if(wine === true) 
      if(indigo === true) 
      if(coal === true) 
     
      frameWidth = document.getElementsByName('frameWidth')[0].value * 10;
      matWidth = document.getElementsByName('matWidth')[0].value * 10;
 
      document.getElementById('price').innerHTML = '€ ' + Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);
      printTotal();
    }
   
    function printTotal(){
      const sizes = Frame.getPrintSizes(getMeta(thumbnail));
      var sizeS = sizes.S;
      var sizeM = sizes.M;
      var sizeL = sizes.L;
      var totalSize = document.getElementById('total-size');
      if(printSize === 'S')
      if(printSize === 'M'){
        totalSize.innerHTML = `${(sizeM[0] + frameWidth + matWidth)/10} x ${(sizeM[1] + frameWidth + matWidth)/10} cm`
      }
      if(printSize === 'L')
    }
 
    function frameSize(){
      const sizes = Frame.getPrintSizes(getMeta(thumbnail));
      var sizeS = sizes.S;
      var sizeM = sizes.M;
      var sizeL = sizes.L;
      var sizeSmall = document.getElementById('print-size-s-label');
      sizeSmall.innerHTML = `Small <br> ${(sizeS[0])/10} x ${(sizeS[1])/10} cm`;
      var sizeMedium = document.getElementById('print-size-m-label');
      sizeMedium.innerHTML = `Medium <br> ${(sizeM[0])/10} x ${(sizeM[1])/10} cm`;
      var sizeLarge = document.getElementById('print-size-l-label');
      sizeLarge.innerHTML = `Large <br> ${(sizeL[0])/10} x ${(sizeL[1])/10} cm`;
    };
 
    function getMeta(url){  
        var img = new Image();
        img.src = url;
        return img;
    }
 
    function boxChangeMat(){
      frameBox.setAttribute('min', 0);
      frameBox.setAttribute('max', 10);
      var inputVal = parseFloat(this.value);
      if(inputVal < 0) else if(inputVal > 10) else {
        sliderMat.value = inputVal.toFixed(1);
        matBox.value = inputVal.toFixed(1);
      }
    }
 
    
 
    
 
    
 
    const form = document.querySelector('#config-form');
    form.addEventListener('submit', );
  