
    //Dummy Function for testing localStorage
    import { ResultItem } from './result-item.js'
    import { CartItem } from './cart-item.js';
    import { addToCart, getUrlParameter } from './cart.js';
    import { render, getPrintSizes, calculatePrice, calculateSize } from './frame.js';

    /* check if objectid exists */
    var params = (new URL(document.location)).searchParams;


    if (!params.get("objectID")) 

    var els = initElements();
    var allConfig = initConfig();

    //id
    allConfig.config.objectID = params.get('objectID');

    const item = JSON.parse(localStorage.getItem(allConfig.config.objectID));
    if (!item) {
      retrieveItem(allConfig.config.objectID).then(data => {
        if (!data || !data.primaryImageSmall) 
        allConfig.item.artistDisplayName = data.artistDisplayName;
        allConfig.item.objectID = data.objectID;
        allConfig.item.title = data.title;
        allConfig.item.objectDate = data.objectDate;
        allConfig.item.primaryImageSmall = data.primaryImageSmall;
        els.descriptionElem.innerHTML = `<strong>${allConfig.item.artistDisplayName}</strong> <br> <i>${allConfig.item.title}, ${allConfig.item.objectDate}</i>`;

        els.img.setAttribute('src', allConfig.item.primaryImageSmall);
        els.img.setAttribute('alt', allConfig.item.title);
        localStorage.setItem(allConfig.item.objectID, JSON.stringify(allConfig.item));
      });
    }


    document.addEventListener('DOMContentLoaded', function (event) {
      var cartObj = localStorage.getItem('cart');
      if (cartObj) 


    })

    els.img.onload = function () {
      var printSizes = getPrintSizes(els.img);
      var smallSize = document.getElementById('print-size-s-label');
      smallSize.innerHTML = "Small<br>" + printSizes.S[0] / 10 + " × " + printSizes.S[1] / 10 + " cm";
      var mediumSize = document.getElementById('print-size-m-label');
      mediumSize.innerHTML = "Medium<br>" + printSizes.M[0] / 10 + " × " + printSizes.M[1] / 10 + " cm";
      var largeSize = document.getElementById('print-size-l-label');
      largeSize.innerHTML = "Large<br>" + printSizes.L[0] / 10 + " × " + printSizes.L[1] / 10 + " cm";
      renderConfig();
    };
    /*get and set default values from url*/
    setDefaultValues(params);




    /* functions */
    function initElements() {

      var img, imgContainer, buyButton, descriptionElem,
        fWidthS, fWidthF, mWidthS, mWidthF, radio;
      /*any event change to these should trigger render*/
      img = document.getElementById('preview-image');
      imgContainer = document.getElementById('preview-container');
      buyButton = document.getElementById('config-form');
      descriptionElem = document.getElementById('image-label');
      fWidthS = document.getElementsByName('frameWidthR')[0];
      fWidthF = document.getElementsByName('frameWidth')[0];
      mWidthS = document.getElementsByName('matWidthR')[0];
      mWidthF = document.getElementsByName('matWidth')[0];
      radio = document.querySelectorAll('input[type = radio]');

      return {
        img, imgContainer, buyButton, descriptionElem,
        fWidthS, fWidthF, mWidthS, mWidthF,
        radio
      };
    }

    function initConfig() {
      return {
        item: new ResultItem(null, null, null, null, null),
        config: new CartItem(null, 'M', 'natural', 4, 'mint', 5.5, 30.00)
      };
    }

    function renderConfig() {
      var totPrice = calculatePrice(allConfig.config.printSize,
        allConfig.config.frameStyle, allConfig.config.frameWidth, allConfig.config.matWidth);

      document.getElementById('price').innerHTML = `€ ${totPrice.toFixed(2)}`;
      allConfig.config.price = price.value;


      var totSize = calculateSize(getPrintSizes(els.img), allConfig.config.printSize, allConfig.config.frameWidth, allConfig.config.matWidth);

      document.getElementById('total-size').innerText = totSize;

      render(els.img, els.imgContainer, allConfig.config.printSize, allConfig.config.frameStyle, allConfig.config.frameWidth, allConfig.config.matColor, allConfig.config.matWidth);
    }







    els.radio.forEach(element => {
      element.addEventListener('click', )
    });



    function setDefaultValues() {

      //printSize
      let actualSize = params.get('printSize');
      switch (actualSize) {
        
        case 'M':
          allConfig.config.printSize = actualSize;
          document.getElementById('print-size-m').checked = true;
          break;
        
        
      }

      //frameStyle
      if (params.get('frameStyle')) {
        allConfig.config.frameStyle = params.get('frameStyle').toLowerCase();
        document.querySelector(`input[value = ${allConfig.config.frameStyle}]`).checked = true;
      }

      //frameWidth
      let tempFWidth = params.get('frameWidth');
      if (tempFWidth) {
        allConfig.config.frameWidth = (tempFWidth > 50  : tempFWidth < 20  : tempFWidth) / 10;
        els.fWidthF.value = allConfig.config.frameWidth;
        els.fWidthS.value = allConfig.config.frameWidth;
      }

      //matColor
      if (params.get('matColor')) {
        allConfig.config.matColor = params.get('matColor');
        document.querySelector(`input[value = ${allConfig.config.matColor}]`).checked = true;
      }

      //matWidth
      let tempMWidth = params.get('matWidth');
      if (params.get('matWidth')) {
        allConfig.config.matWidth = (tempMWidth > 100  : tempMWidth < 0  : tempMWidth) / 10;
        els.mWidthF.value = allConfig.config.matWidth;
        els.mWidthS.value = allConfig.config.matWidth;
      }

    }

    async function retrieveItem(objectID) {
      const promise = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID);

      const item = await promise.json();
      return item;
    }


    els.fWidthS.addEventListener('input', );

    els.fWidthF.addEventListener('change', );



    els.mWidthS.addEventListener('input', );

    els.mWidthF.addEventListener('change', );


    els.buyButton.addEventListener("submit", );
  