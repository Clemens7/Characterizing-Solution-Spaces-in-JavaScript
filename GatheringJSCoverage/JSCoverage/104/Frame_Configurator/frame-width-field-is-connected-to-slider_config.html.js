
    import * as Cache from './cache.js'
    import * as FrameHelp from './frame.js'
    import * as Common from './common.js'

    document.addEventListener('DOMContentLoaded', event => {
      event.preventDefault();
      let objectID = location.search.substring(1).split(/[=&]+/); //weird workaround because the tests fail when the params are loaded like below for the other values
      objectID = objectID[1];

      if (objectID == null || objectID == undefined) 
      displayImage(objectID);
      const params = new URLSearchParams(document.location.search.substring(1));
      console.log(params);
      applyParams(params);

      //showSize();
      calculatePrice();
      document.getElementById('cart-link').innerText = `Cart (${Common.getNumberOfObjectsInCart()})`;

      /*render();
      render();
      render();
      render();
      render();*/

    });

    let frameWidth = document.getElementsByName('frameWidth');
    let frameWidthRange = document.getElementById('frameWidthR');
    frameWidth[0].addEventListener('focusout', );

    frameWidthRange.addEventListener('input', );

    let matWidth = document.getElementsByName('matWidth')[0];
    let matWidthRange = document.getElementsByName('matWidthR')[0];
    matWidth.addEventListener('focusout', );

    matWidthRange.addEventListener('input', );

    let printSizeEvent = document.getElementsByName('printSize');
    addOnClickEvent(printSizeEvent);
    let frameStyleEvent = document.getElementsByName('frameStyle');
    addOnClickEvent(frameStyleEvent);
    let matColorEvent = document.getElementsByName('matColor');
    addOnClickEvent(matColorEvent);

    document.querySelectorAll('fieldset input').forEach(function (elem) {
      elem.addEventListener('change', );
    });

    function addOnClickEvent(elements) {
      for (const element of elements) {
        element.addEventListener('input', );
      }
    }

    function renderFirst() {
      let container = document.getElementById('preview-container');
      let printSize = getChecked(document.getElementsByName('printSize'));
      let frameStyle = getChecked(document.getElementsByName('frameStyle'));
      let matColor = getChecked(document.getElementsByName('matColor'));
      let frameWidthInMM = (frameWidth[0].value * 10);
      let matWidthInMM = (matWidth.value * 10);
      let img = document.getElementById('preview-image');
      img.onload = function(e){
        const sizes = FrameHelp.getPrintSizes(img);

        let printSizesS = document.getElementById('print-size-s-label');
      let printSizesM = document.getElementById('print-size-m-label');
      let printSizesL = document.getElementById('print-size-l-label');
      console.log(sizes.S);
      printSizesS.innerHTML = makeshowSizeText('Small', sizes.S);
      printSizesM.innerHTML = makeshowSizeText('Medium', sizes.M);
      printSizesL.innerHTML = makeshowSizeText('Large', sizes.L);
      //calculateDimensions();
        calculatePrice();
        calculateDimensions();
        FrameHelp.render(img, container, printSize, frameStyle, frameWidthInMM, matColor, matWidthInMM);
      }
      

    }


    

    

    const form = document.getElementById('config-form');

    form.addEventListener('submit', );




    /*function showSize() {
      const img = document.getElementById('preview-image');
      console.log("test");
      img.onload = function (e){
        const sizes = FrameHelp.getPrintSizes(img);

        let printSizesS = document.getElementById('print-size-s-label');
      let printSizesM = document.getElementById('print-size-m-label');
      let printSizesL = document.getElementById('print-size-l-label');
      console.log(sizes.S);
      printSizesS.innerHTML = makeshowSizeText('Small', sizes.S);
      printSizesM.innerHTML = makeshowSizeText('Medium', sizes.M);
      printSizesL.innerHTML = makeshowSizeText('Large', sizes.L);
      calculateDimensions();
      }
      
      
    }*/

    function makeshowSizeText(sizeText, size) {
      const text =
        `${sizeText}<br>${size[0] / 10} × ${size[1] / 10} cm`;
      return text;
    }

    function getChecked(elements) {
      for (const element of elements) {
        if (element.checked) {
          return element.value;
        }
      }}


    


    async function displayImage(id) {
      let artwork = Cache.retrieve(id);
      if (!artwork) {
        artwork = await Common.retrieveArtworksById(id);
        Cache.store(id, artwork);
      }

      if (artwork == null) 
      let image = document.getElementById('preview-image');
      image.src = artwork.primaryImageSmall;
     
      let text = document.getElementById('image-label');
      text.innerHTML = createText(artwork);
      renderFirst();

      

    }

    function createText(artwork) {
      const text =
        `<span class="artist">${artwork.artistDisplayName}</span>
       <span class="title" >${artwork.title}</span>
       <span class="date">${artwork.objectDate}</span>`;
      return text;
    }

    

    function applyParams(params) {
      const matWidth = params.get('matWidth');
      const frameStyle = params.get('frameStyle');
      const frameWidth = params.get('frameWidth');
      const printSize = params.get('printSize');
      const matColor = params.get('matColor');

      if (matWidth) 

      if (frameStyle) 

      if (frameWidth) 

      if (printSize) 

      if (matColor) 
      //render();

    }

    function calculatePrice() {
      document.getElementById('price').innerText = `€ ${
        FrameHelp.calculatePrice(getChecked(document.getElementsByName('printSize')),
          getChecked(document.getElementsByName('frameStyle')),
          document.getElementById('frameWidth').value*10,
          document.getElementById('matWidth').value*10).toFixed(2)}`;
    }

    //neu
    /*function calculatePrice() {
      document.getElementById('price').innerText = `€ ${
        1 * FrameHelp.calculatePrice(getChecked(document.getElementsByName('printSize')),
          getChecked(document.getElementsByName('frameStyle')),
          document.getElementById('frameWidth').value * 10,
          document.getElementById('matWidth').value * 10).toFixed(2)}`;
    }*/

    function calculateDimensions() {
      const img = document.getElementById('preview-image');
      const sizes = FrameHelp.getPrintSizes(img);
      const selectedSize = document.querySelector(`input[name='printSize']:checked`).value;
      const frameAndMat = document.getElementById('frameWidth').value * 2
        + document.getElementById('matWidth').value * 2;

      let width = frameAndMat;
      let height = frameAndMat;
      if (selectedSize === "S")  else if (selectedSize === "M") {
        width += sizes.M[0] / 10; height += sizes.M[1] / 10;
      }
      document.getElementById('total-size').innerText = `${width.toFixed(1)} × ${height.toFixed(1)} cm`;
    }



  