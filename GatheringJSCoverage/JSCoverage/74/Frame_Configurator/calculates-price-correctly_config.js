import { render, getPrintSizes, calculatePrice } from './frame.js';
import { displayCartItems } from './util.js';

var searchURL = './search.html';
var cartUrl = './cart.html';
var configuration;

window.onload = function() {


    /*
        parameter configuration.objectID needed to choose artwork => redirect if missing
    */

    const urlParams = new URLSearchParams(window.location.search);
    configuration = {
        objectID : urlParams.get('objectID')
    };

    if(configuration.objectID == null) 

    /*
        show header cart items
    */
    displayCartItems();

    /*
        fill with predefined configuration
    */

    configuration.image = document.getElementById('preview-image');
    configuration.container = document.getElementById('preview-container');

    setInitialConfiguration(urlParams, configuration);
    setPrice(calculatePrice(configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matWidth));

    /*
        get query parameter 'configuration.objectID', load the requested artwork
    */


    if(window.localStorage.getItem(configuration.objectID) == null) {
        const objectRequest = new XMLHttpRequest();

        var url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
        console.log("GET " + `${url+configuration.objectID}`);
        objectRequest.open("GET", `${url+configuration.objectID}`);
    
        objectRequest.onreadystatechange = () => {
    
            if (objectRequest.readyState == 4)
            { 
                if(objectRequest.status == 404)  else if(objectRequest.status == 200) {
                    console.log('Received response');
                    handleMetObject(objectRequest.response, configuration);
                    window.localStorage.setItem(configuration.objectID, objectRequest.response);
                }
            }
        }
        console.log('Send request to MET API...');
        objectRequest.send();
    }  
    
    /*
        set onsubmit event to add to localStorage 'cart'
    */

    document.getElementById('config-form').onsubmit = 

    /*
        set events to re-render image when values are updated
    */

    // add listeners to all radio buttons of a group
    for (const element of document.getElementsByName('printSize')) {
        element.addEventListener('change', function() {
            if (element.checked) {
                configuration.printSize = element.value;
                renderConfig(configuration);
                setSize(configuration);
                setPrice(calculatePrice(configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matWidth));
            }
        });
    }

    for (const element of document.getElementsByName('frameStyle')) {
        element.addEventListener('change', function() {
            if (element.checked) {
                configuration.frameStyle = element.value;
                renderConfig(configuration);
                setPrice(calculatePrice(configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matWidth));
            }
        });
    }

    for (const element of document.getElementsByName('matColor')) {
        element.addEventListener('change', function() {
            if (element.checked) {
                configuration.matColor = element.value;
                renderConfig(configuration);
            }
        });
    }


    //set event for textfield and range elements, synchronize
    var frameWidthTextField = document.getElementsByName('frameWidth')[0];
    var frameWidthSlider = document.getElementsByName('frameWidthR')[0];

    frameWidthTextField.onchange = () => {
        var valueInMM = handleFrameWidthNum(frameWidthTextField.value*10);
        frameWidthTextField.value = valueInMM / 10;
        frameWidthSlider.value = frameWidthTextField.value;
        handleFrameWidthChange(configuration, valueInMM);
    };

    frameWidthSlider.onchange = ;

    
    var matWidthTextField = document.getElementsByName('matWidth')[0];
    var matWidthSlider = document.getElementsByName('matWidthR')[0];

    matWidthTextField.onchange = () => {
        var valueInMM = handleMatWidthNum(matWidthTextField.value*10);
        matWidthTextField.value = valueInMM / 10;
        matWidthSlider.value = matWidthTextField.value;
        handleMatWidthChange(configuration, valueInMM);
    };

    matWidthSlider.onchange = ;


}


function handleMetObject(objectAsString, configuration) {
    const object = JSON.parse(objectAsString);
    console.log(object);
    if (object.primaryImageSmall === undefined || object.primaryImageSmall == "") 

    configuration.image.onload = function() {
        renderConfig(configuration);
        setPrintSizes(getPrintSizes(configuration.image));
        setSize(configuration);
    }
    configuration.image.src = object.primaryImageSmall;
    document.getElementById('image-label').textContent = `${object.title}: ${object.artistDisplayName}, ${object.objectDate}`;
}

function handleFrameWidthChange(configuration, newValue) {
    configuration.frameWidth = newValue;
    renderConfig(configuration);
    setSize(configuration);
    setPrice(calculatePrice(configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matWidth));
}

function handleMatWidthChange(configuration, newValue) {
    configuration.matWidth = newValue;
    renderConfig(configuration);
    setSize(configuration);
    setPrice(calculatePrice(configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matWidth));
}

function handleFrameWidthNum(num) {
    //default val 40mm
    if(num == null) return 40;
    return handleNum(num, 20, 50);
}

function handleMatWidthNum(num) {
    //default val 55mm
    if(num == null) return 55;
    return handleNum(num, 0, 100);
}

/* set num according to min, max values, round and convert to mm */
function handleNum(num, min, max) {
    if(num < min)  else if(num > max) 

    return Math.round(num);
    //return Math.round(((num + Number.EPSILON) * 10) / 10);
}

function setPrintSizes(printSizesObject) {
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizesObject.S[0]} ?? ${printSizesObject.S[1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizesObject.M[0]} ?? ${printSizesObject.M[1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizesObject.L[0]} ?? ${printSizesObject.L[1]} cm`;
}

function setPrice(price) {
    document.getElementById('price').textContent = `??? ${price.toFixed(2)}`;
}

function setSize(configuration) {
    var printSizes = getPrintSizes(configuration.image)[configuration.printSize];
    const additionalSize = 2*configuration.matWidth/10 + 2*configuration.frameWidth/10;
    document.getElementById('total-size').textContent = `${printSizes[0] + additionalSize} ?? ${printSizes[1] + additionalSize} cm`;
}

function renderConfig(configuration) {
    console.log('Re-render with:');
    console.log(configuration);
    render(configuration.image, configuration.container, configuration.printSize, configuration.frameStyle, configuration.frameWidth, configuration.matColor, configuration.matWidth);
}

function setInitialConfiguration(urlParams, configuration) {

    configuration.printSize = setRadiobuttonAccordingToOption(['S', 'M', 'L'], ['print-size-s', 'print-size-m', 'print-size-l'], urlParams.get('printSize')) || 'M';
    configuration.frameStyle = setRadiobuttonAccordingToOption(['classic', 'natural', 'shabby', 'elegant'], ['frame-style-classic', 'frame-style-natural', 'frame-style-shabby', 'frame-style-elegant'], urlParams.get('frameStyle')) || 'natural';
    configuration.matColor = setRadiobuttonAccordingToOption(['ivory', 'mint', 'wine', 'indigo', 'coal'], ['mat-color-ivory', 'mat-color-mint', 'mat-color-wine', 'mat-color-indigo', 'mat-color-coal'], urlParams.get('matColor')) || 'wine';

    configuration.frameWidth = handleFrameWidthNum(urlParams.get('frameWidth'));
    var valueInCm = configuration.frameWidth / 10;
    console.log('Set framewidth: ' + valueInCm + "cm");

    //set slider and textfield
    document.getElementsByName('frameWidthR')[0].value = valueInCm;
    document.getElementsByName('frameWidth')[0].value = valueInCm;

    configuration.matWidth = handleMatWidthNum(urlParams.get('matWidth'));
    valueInCm = configuration.matWidth / 10;
    console.log('Set matwidth: ' + valueInCm + "cm");

    //set slider and textfield
    document.getElementsByName('matWidthR')[0].value = valueInCm;
    document.getElementsByName('matWidth')[0].value = valueInCm;
    
}

function setRadiobuttonAccordingToOption(options, optionIds, option) {
    if(option == null) return;