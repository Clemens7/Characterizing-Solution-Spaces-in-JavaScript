
      adjustCartsTextIfNecessary();

    let objectId;
    let printSize;
    let frameStyle;
    let frameWidth;
    let matColor;
    let matWidth;
    import {render} from './frame.js';
    import {getPrintSizes} from './frame.js';
    import {calculatePrice} from './frame.js';

    //setting the page up
    document.addEventListener('DOMContentLoaded', event =>{
        objectId = parseInt(window.location.search.split('objectID=')[1]);
        if(objectId === "" || objectId===null || objectId===undefined || objectId===" " || isNaN(objectId)) 
        document.getElementsByName('object-id')[0].value = objectId;


        printSize = window.location.search.split('printSize=')[1];
        if(window.location.search.split('printSize=')[1]===undefined) {
            printSize = document.getElementById('print-size-m').value;
        }
        console.log(printSize);

        frameStyle = window.location.search.split('frameStyle=')[1];
        if(frameStyle===undefined) {
            frameStyle = document.getElementById('frame-style-natural').value;
        }
        console.log(frameStyle);

        frameWidth = window.location.search.split('frameWidth=')[1];
        if(window.location.search.split('frameWidth=')[1]===undefined) {
            frameWidth = document.getElementsByName('frameWidth')[0].value;
        }
        console.log(frameWidth);

        matColor = window.location.search.split('matColor=')[1];
        if(matColor===undefined) {
            matColor = document.getElementById('mat-color-mint').value;
        }
        console.log(matColor);

        matWidth = window.location.search.split('matWidth=')[1];
        if(window.location.search.split('matWidth=')[1]===undefined) {
            matWidth = document.getElementsByName('matWidth')[0].value;
        }
        console.log(matWidth);

        switch(printSize) {
            
            case 'M':
                document.getElementById('print-size-m').click();
                break;
            
            
            
            
        }
        switch(frameStyle) {
            
            case 'natural':
                document.getElementById('frame-style-natural').click();
                break;
            
            
            
        }

        switch (matColor) {
            
            case 'mint':
                document.getElementById('mat-color-mint').click();
                break;
            
            
            
            
        }

        let frameWItem = document.getElementsByName("frameWidth")[0];
        frameWItem.value = frameWidth;
        let rangeSliderMat = document.getElementsByName("frameWidthR")[0];
        rangeSliderMat.value = frameWidth;

        let matWItem = document.getElementsByName("matWidth")[0];
        matWItem.value = matWidth;
        let matSliderMat = document.getElementsByName("matWidthR")[0];
        matSliderMat.value = matWidth;

        putPictureAndText(objectId, printSize, frameStyle, frameWidth, matColor, matWidth);

        let text = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
        let num1 = parseFloat(text.toFixed(10));
        let num2 = num1.toFixed(2);
        document.getElementById('price').innerHTML = "€ ".concat(num2);
        let printSizesText = getPrintSizes(document.getElementById('preview-image'));
        let size_width = calculateWidth(printSizesText, printSize, frameWidth, matWidth);
        let size_height = calculateHeight(printSizesText, printSize, frameWidth, matWidth);
        document.getElementById('total-size').innerText = (size_width/10).toFixed(1).concat(" × ", (size_height/10).toFixed(1));
    });

    //Changing the settings

      document.getElementsByName('printSize')[0].addEventListener('click', )
      document.getElementsByName('printSize')[1].addEventListener('click', event => {
          printSize = document.getElementsByName('printSize')[1].value;
      })
      document.getElementsByName('printSize')[2].addEventListener('click', )
      document.getElementsByName('frameStyle')[0].addEventListener('click', )
      document.getElementsByName('frameStyle')[1].addEventListener('click', event => {
          frameStyle = document.getElementsByName('frameStyle')[1].value;
      })
      document.getElementsByName('frameStyle')[2].addEventListener('click', )
      document.getElementsByName('frameStyle')[3].addEventListener('click', )
      document.getElementsByName('matColor')[0].addEventListener('click', )
      document.getElementsByName('matColor')[1].addEventListener('click', event => {
          matColor = document.getElementsByName('matColor')[1].value;
      })
      document.getElementsByName('matColor')[2].addEventListener('click', )
      document.getElementsByName('matColor')[3].addEventListener('click', )
      document.getElementsByName('matColor')[4].addEventListener('click', )

    document.getElementsByName('frameWidth')[0].addEventListener('change', )
    document.getElementsByName('frameWidthR')[0].addEventListener('change', )

    document.getElementsByName('matWidth')[0].addEventListener('change', )
    document.getElementsByName('matWidthR')[0].addEventListener('change', )

    //range sliders
    let rangeslider = document.getElementsByName("frameWidthR")[0];
    let rangeNumber = document.getElementsByName("frameWidth")[0];

    rangeslider.onchange = 
    rangeNumber.onchange = 

    let rangeSliderMat = document.getElementsByName("matWidthR")[0];
    let rangeNumberMat = document.getElementsByName("matWidth")[0];

    rangeSliderMat.onchange = 
    rangeNumberMat.onchange = 

    document.addEventListener('change', );

    //putting into shopping cart
   document.getElementById('config-form').addEventListener('submit', );

    

    

    async function putPictureAndText(objectId, printSize, frameStyle, frameWidth, matColor, matWidth) {
        let currentObject;
        if(window.localStorage.getItem(objectId)==null) 
        else {
            currentObject = window.localStorage.getItem(objectId);

            try {
                (currentObject = JSON.parse(currentObject))
            }
            ;
            window.localStorage.setItem(objectId, JSON.stringify(currentObject));
        }
        console.log(window.localStorage)
        const imgSrc = currentObject.primaryImageSmall;
        const artist = currentObject.artistDisplayName;
        const title = currentObject.title;
        const date = currentObject.objectDate;
        const currentImg = document.getElementById('preview-image');
        const currentLabel = document.getElementById('image-label');
        currentImg.setAttribute("src", imgSrc);
        currentLabel.appendChild(createLabelElement("artist", artist));
        const TitleEl = createLabelElement("title", title);
        currentLabel.appendChild(TitleEl);
        TitleEl.after(", ");
        currentLabel.appendChild(createLabelElement("date", date));
        render(currentImg, document.getElementById('preview-container'), printSize, frameStyle, frameWidth, matColor, matWidth);

        let printSizesText = getPrintSizes(document.getElementById('preview-image'));
        let text = "Small".concat("\n", (printSizesText['S'][0]/10).toString(10), " × ", (printSizesText['S'][1]/10).toString(10), " cm");
        document.getElementById('print-size-s-label').innerText = text;
        text = "Medium".concat("\n", (printSizesText['M'][0]/10).toString(10), " × ", (printSizesText['M'][1]/10).toString(10), " cm");
        document.getElementById('print-size-m-label').innerText = text;
        text = "Large".concat("\n", (printSizesText['L'][0]/10).toString(10), " × ", (printSizesText['L'][1]/10).toString(10), " cm");
        document.getElementById('print-size-l-label').innerText = text;

        let size_width = calculateWidth(printSizesText, printSize, frameWidth, matWidth);
        let size_height = calculateHeight(printSizesText, printSize, frameWidth, matWidth);
        document.getElementById('total-size').innerText = (size_width/10).toFixed(1).concat(" × ", (size_height/10).toFixed(1));


    }

    function createLabelElement(type, text){
        let element = document.createElement("span");
        element.classList.add(type);
        element.innerText = text;
        return element;
    }

    

    function calculateWidth(printSizes, printSize, matWidth, frameWidth) {
        let width;
        let height;
        switch(printSize){
            
            case 'M':
                width = printSizes['M'][0];
                height = printSizes['M'][1];
                break;
            
            
        }
        width = width + 2*10*matWidth + 2*10*frameWidth;
        return width;

    }

    function calculateHeight(printSizes, printSize, matWidth, frameWidth) {
        let width;
        let height;
        switch(printSize){
            
            case 'M':
                width = printSizes['M'][0];
                height = printSizes['M'][1];
                console.log(width, height);
                break;
            
            
        }

        height = height + 2*10*matWidth + 2*10*frameWidth;
        return height;

    }

      /*Functions to adjust Cart Text (id cart-link) in the nav to show amounts of items in the cart*/

      function adjustCartsTextIfNecessary(){
          const amount = getAmountOfItemsInCart();
          if(amount > 0)
      }

      function getAmountOfItemsInCart(){
          const json = JSON.parse(window.localStorage.getItem('cart'));
          if(json == null)
              

          return json.length;
      }

  