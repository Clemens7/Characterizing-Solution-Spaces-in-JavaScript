
    import {GalleryDocumentContainer} from "./GalleryDocumentContainer.js";
    import * as GalleryAPI from "./searchAPI.js";
    import * as GalleryCache from "./artwork-cache.js"
    import {showNumItems} from "./common.js";
    import * as frame from './frame.js';


/////////////////////////////////////////////////////////////////////////
    document.getElementById('cart-link').innerHTML = 'Cart' + showNumItems();


    let frameSlider = document.getElementsByName('frameWidthR');
    let frameWidth = frameSlider[0].value;
    frameSlider[0].addEventListener('change', );
    let frameText = document.getElementsByName('frameWidth');
    frameText[0].addEventListener('change', event => {
      frameWidth = frameText[0].value;
      let y = document.getElementsByName('frameWidthR');
      if (frameWidth < 2){
        frameWidth = 2;
      }else if (frameWidth > 5) {
        frameWidth = 5;
      }

      y[0].setAttribute('value', Math.round(frameWidth * 10) / 10);
      frameText[0].setAttribute('value', Math.round(frameWidth * 10) / 10);
      frameText[0].value = Math.round(frameWidth * 10) / 10;
      y[0].value = Math.round(frameWidth * 10) / 10;

    });

    let matSlider = document.getElementsByName('matWidthR');
    let matWidth = matSlider[0].value;
    matSlider[0].addEventListener('change', );
    let matText = document.getElementsByName('matWidth');
    matText[0].addEventListener('change', );

    function getRadioValue(name){
      let radios = document.getElementsByName(name);
      for (let radio of radios){
        if(radio.checked){
          return radio.value;
        }
      }}

    let printSize = getRadioValue('printSize');
    let frameStyle = getRadioValue('frameStyle');
    let matColor = getRadioValue('matColor');



/////////////////////////////////////////////////////////////////////



    const selectedArtwork = GalleryCache.retrieve('configArtwork');
  //  if(!selectedArtwork){
  //    window.location ='search.html';
  //  }else{
      let div_museum_label = document.createElement('div');
      div_museum_label.setAttribute('class','museum-label');
      let artist_span=document.createElement('span');
      artist_span.setAttribute('class','artist');
      artist_span.innerText=selectedArtwork.artist;
      let title_span=document.createElement('span');
      title_span.setAttribute('class','title');
      title_span.innerText=selectedArtwork.title + ', ';
      let date_span=document.createElement('span');
      date_span.setAttribute('class','date');
      date_span.innerText=selectedArtwork.date;

      div_museum_label.appendChild(artist_span);
      div_museum_label.appendChild(title_span);
      div_museum_label.appendChild(date_span);

      let prImage = selectedArtwork.image;
      let img = document.createElement('img');
      img.src = prImage;
      img.id = 'preview-image'
      let container = document.getElementById('preview-container');
      container.appendChild(img);
      container.appendChild(div_museum_label);
      frame.render(img, container, getRadioValue('printSize'), getRadioValue('frameStyle'), frameWidth, getRadioValue('matColor'), matWidth);
  //    }
      document.getElementById("price").innerText = "??? " + frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);



      let configForm = document.getElementById("config-form");

      configForm.addEventListener("change", );




      ////////////////////////////////////////////////////////
      configForm.addEventListener("submit", );



//////////////////////////////////////////


        const params = (new URL(window.location)).searchParams;
        const ps = params.get('printSize');
        if (!ps ) ) ) ) ) 


    /*document.addEventListener('DOMContentLoaded', event => {
        const params = (new URL(document.location)).searchParams;
        setValue(printSize);
        setValue(frameStyle);
        setValue(frameWidth);
        setValue(matColor);
        setValue(matWidth);

    })*/


  