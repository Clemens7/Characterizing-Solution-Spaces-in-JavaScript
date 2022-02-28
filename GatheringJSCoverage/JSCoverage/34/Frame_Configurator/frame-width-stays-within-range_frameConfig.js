import {getOneArtworkByID, getFromLocalStorage, addToLocalStorage} from './searchService.js';
import * as frame from './frame.js';
import {displayCartCount} from './main.js';

let cart = "cart";

class Configuration{
    constructor(objectID, printSize = "M", frameWidth = 0, frameStyle = "natural", matWidth = 0, matColor = "ivory"){
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameWidth = frameWidth;
        this.frameStyle = frameStyle;
        this.matWidth = matWidth;
        this.matColor = matColor;
    }
}

let currentConfig;

//trigger PageLoad events
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    let urlParams = new URLSearchParams(window.location.search)
    loadPresets(urlParams);
    pageLoad(urlParams);
  });

//on PageLoad read the requested Image (via ObjectID) from the QueryString
//fetch the artwork wia the localstorage and redirect to search, if no objectID is passed, or it's invalid
async function pageLoad(urlParams){
    var artwork;
    if(!urlParams.has('objectID'))

    var objectID = urlParams.get('objectID');
    await getOneArtworkByID(objectID).then(response => {
        artwork = response;

    }).catch();

    if(artwork.message === "Not Found" || artwork.message === "ObjectID not found")

    document.getElementById("preview-image").src = artwork.primaryImageSmall;
    document.getElementById("image-label").innerHTML = `<h3>${artwork.artistDisplayName}</h3><p>${artwork.title}. ${artwork.objectDate}</p>`;

    //TO-DO get or create currentConfig
    currentConfig = new Configuration(objectID);

    render();
    //loadPresets(urlParams);
    displayCartCount();
}

//load the presets referenced in the queryString
async function loadPresets(urlParams){
    //get the printsizes from the provided function in frame.js
    if(urlParams.has('printSize'))
    if(urlParams.has('frameStyle'))
    if(urlParams.has('frameWidth'))

    if(urlParams.has('matWidth'))

    if(urlParams.has('matColor'))
}

function render(){

    let printSize;
    let frameStyle;
    let matColor;
    let frameWidth = document.getElementsByName('frameWidth')[0].value;
    let matWidth = document.getElementsByName('matWidth')[0].value;
    document.getElementsByName('printSize').forEach(element =>{ if(element.checked){
        printSize = element.value;
     }});
     document.getElementsByName('frameStyle').forEach(element => {
         if(element.checked)
            frameStyle = element.value;
     });

     document.getElementsByName('matColor').forEach(element => {
        if(element.checked)
           matColor = element.value;
    });


    //calculate the price
    document.getElementById('price').innerHTML = `€ ${parseFloat(frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth)).toFixed(2)}`;

    currentConfig.printSize = printSize;
    currentConfig.frameWidth = frameWidth*10;
    currentConfig.frameStyle = frameStyle;
    currentConfig.matWidth = matWidth*10;
    currentConfig.matColor = matColor;
    
    frame.render(document.getElementById('preview-image'), document.getElementById('preview-container'), printSize, frameStyle, frameWidth*10, matColor, matWidth*10);

    var sizes = frame.getPrintSizes(document.getElementById('preview-image'));
    document.getElementById('print-size-s-label').innerHTML = `Small<br/>${sizes["S"][0]/10} x ${sizes["S"][1]/10} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br/>${sizes["M"][0]/10} x ${sizes["M"][1]/10} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br/>${sizes["L"][0]/10} x ${sizes["L"][1]/10} cm`;
    
    //print the total size
    document.getElementById('total-size').innerHTML = getTotalSize(sizes);
}

function getTotalSize(sizes){
    let totalWidth = sizes[currentConfig.printSize][0]/10 + 2 * currentConfig.frameWidth/10 + 2 * currentConfig.matWidth/10;
    let totalHeight = sizes[currentConfig.printSize][1]/10 + 2 * currentConfig.frameWidth/10 + 2 * currentConfig.matWidth/10;
    return totalWidth.toFixed(1) + ' x ' + totalHeight.toFixed(1) + ' cm';
}


//Tests not working with "input" event - even though there would be instant updates to values....
// //Add Listeners for the change of the sliders
// document.getElementsByName('frameWidth')[0].addEventListener('input', function(){
//     //first truncuate all values after the 1st decimal
//     this.value = this.valueAsNumber.toFixed(1);

//     //if the after Comma Digit ist 0, then only display whole numbers
//     if(this.valueAsNumber % 1 === 0)
//         this.value = this.valueAsNumber.toFixed(0);

//     //values ranged between 2 and 5
//     if(this.value < 2){
//         this.value = 2;
//     }
//     if(this.value > 5){
//         this.value = 5;
//     }
//     document.getElementsByName('frameWidthR')[0].value = this.value;

//     render();
// })

// document.getElementsByName('frameWidthR')[0].addEventListener('input', function(){
//     document.getElementsByName('frameWidth')[0].value = this.value;
//     render();
// })

// document.getElementsByName('matWidth')[0].addEventListener('input', function(){
//     this.value = this.valueAsNumber.toFixed(1);

//     if(this.valueAsNumber % 1 === 0)
//         this.value = this.valueAsNumber.toFixed(0);
//     if(this.value < 0)
//         this.value = 0;
//     if(this.value > 10)
//         this.value = 10;
//     document.getElementsByName('matWidthR')[0].value = this.value;
//     render();
// })

// document.getElementsByName('matWidthR')[0].addEventListener('input', function(){
//     document.getElementsByName('matWidth')[0].value = this.value;
//     render();
// })

document.getElementsByName('frameWidth')[0].addEventListener('change', function(){
    //first truncuate all values after the 1st decimal
    this.value = this.valueAsNumber.toFixed(1);

    //if the after Comma Digit ist 0, then only display whole numbers
    if(this.valueAsNumber % 1 === 0)
        this.value = this.valueAsNumber.toFixed(0);

    //values ranged between 2 and 5
    if(this.value < 2){
        this.value = 2;
    }
    if(this.value > 5){
        this.value = 5;
    }
    document.getElementsByName('frameWidthR')[0].value = this.value;

    render();
})

document.getElementsByName('frameWidthR')[0].addEventListener('change', )

//analogous to the frameWidth
document.getElementsByName('matWidth')[0].addEventListener('change', )

document.getElementsByName('matWidthR')[0].addEventListener('change', )


document.getElementsByClassName('frame-style-row')[0].addEventListener('click', function() {render();})

document.getElementsByClassName('segmented')[0].addEventListener('click', )

document.getElementsByClassName('mat-color-row')[0].addEventListener('click', )

document.getElementsByClassName('buy')[0].addEventListener('click', )


;

