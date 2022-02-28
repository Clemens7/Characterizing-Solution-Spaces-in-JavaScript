import {requestById} from './museumAPI.js';
import * as frame from './frame.js';

let img;

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    const objectId = params.get('objectID');
    if (!objectId) 

    let painting = cacheLoad(objectId);
    if (painting) else{
        requestById(objectId).then(result => {
            handleLoadedPainting(result);
            cacheStore(objectId,result);
        });
    }
  
    handleOptionalParams(params);   //maybe back to above handleLoadedPainting

    //event listeners for value changes
    document.getElementsByName('frameWidth')[0].addEventListener('change', event => {
        if (event.target.value < 2) {
            event.target.value = 2;
        }
        if (event.target.value > 5) {
            event.target.value = 5;
        }
        event.target.value = Math.round(event.target.value * 10) / 10;
        document.getElementsByName('frameWidthR')[0].value = event.target.value;
        renderCurrentImage();
    });

    document.getElementsByName('frameWidthR')[0].addEventListener('change', );

    document.getElementsByName('matWidth')[0].addEventListener('change', );

    document.getElementsByName('matWidthR')[0].addEventListener('change', );

    setRadioListener('printSize');
    setRadioListener('frameStyle');
    setRadioListener('matColor');
});

function cacheStore(key,painting){
    localStorage[key] = JSON.stringify(painting);
}

function cacheLoad(key){
    if (key in localStorage) 
}

function setRadioListener(name){
    let elem;
    for(elem of document.getElementsByName(name)){
        elem.addEventListener('change',);
    }
}

function handleLoadedPainting(painting){
    if (painting['message'] == 'ObjectID not found') 

    img = document.getElementById('preview-image');
    img.addEventListener('load',() => {
        renderCurrentImage();
        handlePrintSizeElements();
    });
    img.src = painting['primaryImageSmall'];
    /*
    img = document.getElementById('preview-image');
    loadImage(img,painting['primaryImage'])
        .then(renderCurrentImage())
        .catch(error => console.error(error));
    */
    handleLabel(painting);
}

function handlePrintSizeElements(){
    let printSizes = frame.getPrintSizes(img);

    let small = document.getElementById('print-size-s-label');
    let medium = document.getElementById('print-size-m-label');
    let large = document.getElementById('print-size-l-label');
    setPrintSizeElement(printSizes['S'],'Small',small);
    setPrintSizeElement(printSizes['M'],'Medium',medium);
    setPrintSizeElement(printSizes['L'],'Large',large);
}

function setPrintSizeElement(sizes,string,elem){
    elem.innerHTML = `${string}<br>${sizesToString(sizes[0],sizes[1])}`;
}

function sizesToString(w,h){
    w /= 10;
    h /= 10;
    return `${w} x ${h} cm`;
}

function handleLabel(painting){
    let label = document.getElementById('image-label');

    let div = document.createElement('div');
    let title = document.createElement('strong');
    title.textContent = painting['artistDisplayName'];
    label.appendChild(div);
    div.appendChild(title);

    let text = document.createElement('em');
    text.textContent = `${painting['title']}, ${painting['objectDate']}`;
    label.appendChild(text);
}



function handleOptionalParams(params){
    handleOptionalParamRadio('printSize',params);
    handleOptionalParamRadio('frameStyle',params);
    handleOptionalParamRadio('matColor',params);

    handleOptionalParamNumber('frameWidth',20,50,params);
    handleOptionalParamNumber('matWidth',0,100,params);
}

function handleOptionalParamNumber(name,min,max,params){
    const value = params.get(name);
    if (value) 
}



function handleOptionalParamRadio(name,params){
    const paramValue = params.get(name);
    if(paramValue)
}



function getSelectedFromRadio(name) {
    let elements = document.getElementsByName(name);
    let elem;
    for(elem of elements) {
        if (elem.checked) {
            return elem.value;
        }
    }
}

function renderCurrentImage(){
    let container = document.getElementById('preview-container');
    let printSize = getSelectedFromRadio('printSize');
    let frameStyle = getSelectedFromRadio('frameStyle');
    let matColor = getSelectedFromRadio('matColor');
    let frameSize = document.getElementsByName('frameWidth')[0].value * 10;
    let matSize = document.getElementsByName('matWidth')[0].value * 10;
    frame.render(img,container,printSize,frameStyle,frameSize,matColor,matSize);

    setPrice(printSize,frameStyle,frameSize,matSize);
    setSize(printSize,frameSize,matSize);
}

function setPrice(printSize, frameStyle, frameWidth, matWidth){
    let price = frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    price = price.toFixed(2);
    document.getElementById('price').textContent = `\u20AC ${price}`;
}

function setSize(printSize,frameWidth,matWidth){
    let printSizes = frame.getPrintSizes(img);
    let w = printSizes[printSize][0];
    let h = printSizes[printSize][1];
    w += frameWidth + matWidth;
    h += frameWidth + matWidth;

    document.getElementById('total-size').textContent = sizesToString(w,h);
}
