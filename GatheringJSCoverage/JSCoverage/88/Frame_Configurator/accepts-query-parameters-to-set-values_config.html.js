
    import {calculatePrice, render, getPrintSizes} from "./frame.js";
    import {getShoppingCart, saveShoppingCart} from "./Util.js";
    import CartItem from "./CartItem.js";

    let urlParameters = new URLSearchParams(window.location.search);
    let objID = null;
    let printSize = null;
    let frameStyle = null;
    let frameWidth = null;
    let matColor = null;
    let matWidth = null;

    //Frame Width Slider functions
    let sliderFrameWidth = document.getElementsByName('frameWidthR')[0];
    sliderFrameWidth.defaultValue = 2.0; //default must be set to 2
    sliderFrameWidth.step = 0.1;
    let numberFrameWidth = document.getElementsByName('frameWidth')[0];
    numberFrameWidth.defaultValue = 2.0;

    //Getting frame width
    if (urlParameters.has('frameWidth')) {
        frameWidth = parseFloat(urlParameters.get('frameWidth'))/10;
        if (frameWidth < 2.0) 
        if (frameWidth > 5.0) 
    }

    //Setting frame slider and number fields
    sliderFrameWidth.value = Math.round(frameWidth * 10) / 10;
    numberFrameWidth.value = Math.round(frameWidth * 10) / 10;
    urlParameters.set('frameWidth', Math.round(frameWidth * 10) / 10);

    //Mat Width Slider functions
    let sliderMatWidth = document.getElementsByName('matWidthR')[0];
    sliderMatWidth.defaultValue = 0.0;
    sliderMatWidth.step = 0.1;
    let numberMatWidth = document.getElementsByName('matWidth')[0];

    //Getting mat width
    if (urlParameters.has('matWidth')) {
        matWidth = parseFloat(urlParameters.get('matWidth'))/10;
        if (matWidth > 10.0) 
        if (matWidth < 0.0) 
    }

    //Setting mat slider and number fields
    sliderMatWidth.value = Math.round(matWidth * 10) / 10;
    numberMatWidth.value = Math.round(matWidth * 10) / 10;
    urlParameters.set('matWidth', Math.round(matWidth * 10) / 10);

    //Cart Things
    let shoppingCart = getShoppingCart();
    if (shoppingCart ) 

    const form = document.querySelector('.buy');
    form.addEventListener('submit', );

    form.addEventListener('click', );

    //Getting objectID
    if (urlParameters.has('objectID')) {
        objID = urlParameters.get('objectID');
    }

    //Getting printSize
    if (urlParameters.has('printSize')) {
        printSize = urlParameters.get('printSize');
        document.getElementById('print-size-m').checked = false;
        document.getElementById('print-size-'+printSize.toLowerCase()).checked = true;
    }

    //Getting framestyle
    if (urlParameters.has('frameStyle')) {
        frameStyle = urlParameters.get('frameStyle');
        document.getElementById('frame-style-natural').checked = false;
        document.getElementById('frame-style-' + frameStyle).checked = true;
    }

    //Getting mat color
    if (urlParameters.has('matColor')) {
        matColor = urlParameters.get('matColor');
        document.getElementById('mat-color-mint').checked = false;
        document.getElementById('mat-color-' + matColor).checked = true;
    }

    const img = document.getElementById('preview-image');
    const imgContainer = document.getElementById('preview-container');

    let request = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objID;

    fetch(request)
        .then(async function (data) {
            if (data.status !== 200)  else {
                data = await data.json();

                //set image
                img.setAttribute('src', data.primaryImageSmall);
                img.addEventListener('load', function () {

                    //display correct print sizes
                    const printSizes = getPrintSizes(img);

                    //Small Print Size
                    document
                        .getElementById('print-size-s-label')
                        .innerHTML = 'Small<br>' +
                        printSizes['S'][0] / 10 +
                        ' × ' +
                        printSizes['S'][1] / 10 +
                        ' cm';

                    //Medium Print Size
                    document
                        .getElementById('print-size-m-label')
                        .innerHTML = 'Medium<br>' +
                        (printSizes['M'][0]) / 10 +
                        ' × ' +
                        printSizes['M'][1] / 10 +
                        ' cm';

                    //Large Print Size
                    document
                        .getElementById('print-size-l-label')
                        .innerHTML = 'Large<br>' +
                        printSizes['L'][0] / 10 +
                        ' × ' +
                        printSizes['L'][1] / 10 +
                        ' cm';

                    sliderFrameWidth.addEventListener('change', );

                    numberFrameWidth.addEventListener('change', );

                    sliderMatWidth.addEventListener('change', );

                    numberMatWidth.addEventListener('change', );

                    document.getElementById('print-size-s').addEventListener('click', );

                    document.getElementById('print-size-m').addEventListener('click', );

                    document.getElementById('print-size-l').addEventListener('click', );

                    //update frame style
                    document.querySelectorAll('.frame-style-item').forEach(elem => {
                        elem.addEventListener('change', )
                    });

                    document.querySelectorAll('.mat-color-item').forEach(elem => {
                        elem.addEventListener('change', )
                    });

                    //if price * 10 is Int i.e. 34.3 * 10 -> 34.30, 34.0 -> 34.00
                    let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
                    if (!Number.isInteger(price) && Number.isInteger(price * 10)) 
                    document.getElementById('price').innerText = '€ ' + price;
                    document.getElementById('total-size').innerText = ((parseFloat(printSizes[printSize][0]) / 10 + parseFloat(frameWidth)) + parseFloat(matWidth)) + ' x ' + ((parseFloat(printSizes[printSize][1]) / 10 + parseFloat(frameWidth)) + parseFloat(matWidth)) + ' cm';

                    render(img, imgContainer, printSize, frameStyle, frameWidth * 10, matColor, matWidth * 10);
                });

                //add image description (artist, title, year)
                let imgArtist = document.createElement('span');
                imgArtist.setAttribute('class', 'artist');
                imgArtist.innerText = data.artistDisplayName;

                document.getElementById('image-label').appendChild(imgArtist);
                let imgTitle = document.createElement('span');
                imgTitle.setAttribute('class', 'title');
                imgTitle.innerText = data.title;

                document.getElementById('image-label').appendChild(imgTitle);
                let imgYear = document.createElement("span");
                imgYear.setAttribute('class', 'date');
                imgYear.innerText = ' ' + data.objectDate;

                document.getElementById('image-label').appendChild(imgYear);
            }
        })
        .catch();
