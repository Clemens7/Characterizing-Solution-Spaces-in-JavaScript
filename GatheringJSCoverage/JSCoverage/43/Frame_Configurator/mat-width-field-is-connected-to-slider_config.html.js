
    import * as Frame from '/frame.js';
    import { ConfiguredImage } from '/configuredImage.js';
    import * as CartCache from '/cart-cache.js';
    import * as ArtworkCache from '/artwork-cache.js';
    import * as SearchAPI from '/search-api.js';

    let defImg;
    let configuredImage;

    async function cacheArtwork(objectID){   
      const cachedImage = ArtworkCache.retrieve(objectID);
      if(!cachedImage){
        let artwork = await SearchAPI.retrieveArt(objectID);
        console.log(artwork);
        ArtworkCache.store(objectID, artwork);
      } 
    }




    //Main event listener
    document.addEventListener('DOMContentLoaded', event => {


      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get('objectID');
      if(!param)

      cacheArtwork(param);
      const cache = CartCache.retrieve();
      const cart = document.getElementById('cart-link');
      if(cache)


      getPictureAndLabel(param);

      const printSize = urlParams.get('printSize');
      const frameStyle = urlParams.get('frameStyle');
      const frameWidth = urlParams.get('frameWidth');
      const matColor = urlParams.get('matColor');
      const matWidth = urlParams.get('matWidth');

      async function getPictureAndLabel(objectID) {
        try {

          const URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
          const objResponse = await fetch(URL);
          const objRawData = await objResponse.json();
          if(!objRawData.primaryImageSmall)

          const prevContainer = document.getElementById('preview-container')
          const previewPicture = document.createElement('img');
          previewPicture.src = objRawData.primaryImageSmall;
          previewPicture.id = "preview-image";
          prevContainer.appendChild(previewPicture);

          const previewLabel = document.createElement('div');
          previewLabel.id = "image-label";
          previewLabel.classList.add("museum-label");
          prevContainer.appendChild(previewLabel);

          const artist = document.createElement('span');
          artist.classList.add("artist");
          artist.innerHTML = objRawData.artistDisplayName;
          previewLabel.appendChild(artist);
          const title = document.createElement('span');
          title.classList.add("title");
          title.innerHTML = objRawData.title;
          previewLabel.appendChild(title);
          const date = document.createElement('span');
          date.classList.add("date");
          date.innerHTML = objRawData.objectDate;
          previewLabel.appendChild(date);

         // configuredImage = new ConfiguredImage(previewPicture, prevContainer,printSize);
           defImg = {
            image: previewPicture,
            container : prevContainer,
            printSize : printSize,
            frameStyle : frameStyle,
            frameWidth : frameWidth,
            matColor : matColor,
            matWidth : matWidth
          }
          update();
        }catch(error) {
          console.log("Error occured.");
          console.log(error);
        }

      }
    //TODO: Ensure Valid Input for textfields
        document.getElementById("print-size-" + printSize.toLowerCase()).setAttribute("checked","");
        document.getElementById("frameField").setAttribute("value", checkUrlValue(frameWidth.toString(),2,5));
        document.getElementById("matField").setAttribute("value",checkUrlValue(matWidth.toString(),0,10));
        document.getElementById("frameSlider").value = checkUrlValue(frameWidth.toString(),2,5);
        document.getElementById("matSlider").value = checkUrlValue(matWidth.toString(),0,10);
        document.getElementById("frame-style-" + frameStyle.toLowerCase()).setAttribute("checked","");
        document.getElementById("mat-color-" + matColor.toLowerCase()).setAttribute("checked","");



    });
    
    function update(){
      let size = document.querySelector("div.segmented").getElementsByTagName("label");
      let small = Frame.getPrintSizes(defImg.image).S;
      let medium = Frame.getPrintSizes(defImg.image).M;
      let large = Frame.getPrintSizes(defImg.image).L;
      size.item(0).childNodes.item(2).data = small[0] + " x " + small[1] + " cm";
      size.item(1).childNodes.item(2).data = medium[0] + " x " + medium[1] + " cm";
      size.item(2).childNodes.item(2).data = large[0] + " x " + large[1] + " cm";


      document.getElementById("price").innerHTML = "€ " +  Frame.calculatePrice2(defImg.printSize,defImg.frameStyle,defImg.frameWidth,defImg.matWidth).toFixed(2);

      Frame.render(defImg.image,defImg.container,defImg.printSize,defImg.frameStyle,defImg.frameWidth,defImg.matColor,defImg.matWidth);


    }
    document.getElementById("print-size-s").addEventListener('click',);
    document.getElementById("print-size-m").addEventListener('click',);
    document.getElementById("print-size-l").addEventListener('click',);




    document.getElementById("frame-style-classic").addEventListener('click',);
    document.getElementById("frame-style-natural").addEventListener('click',);
    document.getElementById("frame-style-shabby").addEventListener('click',);
    document.getElementById("frame-style-elegant").addEventListener('click',);



    document.getElementById("mat-color-ivory").addEventListener('click',);
    document.getElementById("mat-color-mint").addEventListener('click',);
    document.getElementById("mat-color-wine").addEventListener('click',);
    document.getElementById("mat-color-indigo").addEventListener('click',);
    document.getElementById("mat-color-coal").addEventListener('click',);


    document.getElementById("frameField").addEventListener("change", );

    document.getElementById("frameSlider").addEventListener("input", );

      document.getElementById("matField").addEventListener("change", event => {
        const matField = document.getElementById("matField");
        matField.value = validate(matField.value, 0, 10);
        document.getElementById("matSlider").value = matField.value;
        console.log(matField.value);
        defImg.matWidth = matField.value;
        console.log(defImg.matWidth);
        event.defaultPrevented;
        update();
      });
    document.getElementById("matSlider").addEventListener("input", );

    function validate(inputData, min, max) {
        inputData = parseFloat(inputData).toFixed(1);
        let result = inputData;
        let check = inputData - Math.round(inputData);
        if (check === 0 )
      if (inputData > max 
      if (inputData < min 


        return result;
    }



  