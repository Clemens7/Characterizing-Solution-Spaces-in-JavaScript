import { calculatePrice, render, getPrintSizes } from './frame.js';
import { requestObjectInfo } from './request.js';
import * as store from './cartStore.js';
let matcolorpicker,
    framestylepicker,
    printsizepicker,
    addtocartbutton,
    framewidthslider,
    matslider,
    framewidthtext,
    mattext,
    configForm,
    image,
    imagecontainer;

//redirect from search
//setup variables with default values
let url = new URL(window.location);
let objectid = url.searchParams.get('objectID') ;
let printSize = url.searchParams.get('printSize') || 'M';
let frameStyle = url.searchParams.get('frameStyle') || 'classic';
let frameWidth = parseFloat(url.searchParams.get('frameWidth') / 10 || 4.0);
let matColor = url.searchParams.get('matColor') || 'mint';
let matWidth = parseFloat(url.searchParams.get('matWidth') / 10 || 5.5);
//needed for delete objects on update
//can't be done now otherwise reload does not work
let oldVariables = JSON.parse(
    JSON.stringify({
        objectID: objectid,
        printSize,
        frameStyle,
        frameWidth: frameWidth * 10,
        matColor,
        matWidth: matWidth * 10,
    })
);

let objectinfoRequest = requestObjectInfo(objectid);
if (null == objectid) 
window.onload = function () {
    objectinfoRequest
        .then((objectinfo) => {
            document.getElementById('title-lable').innerHTML = objectinfo.title;
            document.getElementById('artist-lable').innerHTML =
                objectinfo.artistDisplayName + ', ';
            document.getElementById('date-lable').innerHTML =
                objectinfo.objectDate;
            let previewContainer = document.getElementById('preview-container');

            image = document.getElementById('preview-image');
            if (image !== null) 
            let template = document.createElement('template');
            template.innerHTML = `<img src="${objectinfo.primaryImageSmall}" alt="" id="preview-image">`;
            previewContainer.insertBefore(
                template.content.firstChild,
                previewContainer.firstChild
            );
            image = document.getElementById('preview-image');
            updatepreview();
        })
        .catch();
    store.displayNumItems();

    imagecontainer = document.getElementById('preview-container');
    updatepreview();

    framewidthslider = document.getElementById('framewidthslider');
    matslider = document.getElementById('matslider');
    framewidthtext = document.getElementById('framewidthtext');
    mattext = document.getElementById('mattext');
    addtocartbutton = document.getElementById('addtocartbutton');
    matcolorpicker = document.getElementsByName('matColor');
    framestylepicker = document.getElementsByName('frameStyle');
    printsizepicker = document.getElementsByName('printSize');
    configForm = document.getElementById('config-form');

    configForm.onsubmit = ;

    for (let element of matcolorpicker) {
        element.onchange = function () {
            matColor = this.value;
            updatepreview();
        };
    }

    for (let element of framestylepicker) {
        element.onchange = function () {
            frameStyle = this.value;
            updatepreview();
        };
    }

    for (let element of printsizepicker) {
        element.onchange = function () {
            printSize = this.value;
            updatepreview();
        };
    }

    framewidthslider.onchange = ;

    framewidthtext.onchange = function () {
        this.value = Math.round(this.value * 10) / 10;
        this.value = Math.max(2, Math.min(this.value, 5));
        framewidthslider.value = this.value;
        frameWidth = this.value;
        updatepreview();
    };

    matslider.onchange = ;
    mattext.onchange = function () {
        this.value = Math.round(this.value * 10) / 10;
        this.value = Math.max(0, Math.min(this.value, 10));
        matslider.value = this.value;
        matWidth = this.value;
        updatepreview();
    };
    adjustcontrols();
    updatepreview();
};

function updatepreview() {
    if (!image) {
        return;
    }
    const printSizes = getPrintSizes(image);
    updateprintsizes(printSizes);
    render(
        image,
        imagecontainer,
        printSize,
        frameStyle.toLocaleLowerCase(),
        frameWidth,
        matColor.toLocaleLowerCase(),
        matWidth
    );

    let price = calculatePrice(
        printSize,
        frameStyle.toLocaleLowerCase(),
        frameWidth * 10,
        matWidth * 10
    );
    if (isNaN(price)) 
    let tmpp = `${price}`.split('.');

    if (tmpp.length > 1 && tmpp[1].length < 2) {
        price = tmpp[0] + '.' + tmpp[1] + '0';
    }
    document.getElementById('price').innerHTML = '&euro; ' + price;
}

function updateprintsizes(printSizes) {
    const printSizeDesc = {
        S: 'Small',
        M: 'Medium',
        L: 'Large',
    };
    let sizePicker = document.getElementsByName('printSize');
    for (let element of sizePicker) {
        element.nextElementSibling.innerHTML =
            printSizeDesc[element.value] +
            '<br>' +
            printSizes[element.value][0] +
            ' x ' +
            printSizes[element.value][1] +
            ' cm';
        if (element.value === printSize) {
            document.getElementById('total-size').innerHTML =
                Math.round(
                    (printSizes[element.value][0] +
                        parseFloat(frameWidth) +
                        parseFloat(matWidth) +
                        Number.EPSILON) *
                        100
                ) /
                    100 +
                ' x ' +
                Math.round(
                    (printSizes[element.value][1] +
                        parseFloat(frameWidth) +
                        parseFloat(matWidth) +
                        Number.EPSILON) *
                        100
                ) /
                    100 +
                ' cm';
        }
    }
}

function adjustcontrols() {
    matslider.value = matWidth;
    framewidthslider.value = frameWidth;
    framewidthtext.value = frameWidth;
    mattext.value = matWidth;
    document.getElementById(
        'mat-color-' + matColor.toLocaleLowerCase()
    ).checked = true;
    document.getElementById(
        'print-size-' + printSize.toLocaleLowerCase()
    ).checked = true;
    document.getElementById(
        'frame-style-' + frameStyle.toLocaleLowerCase()
    ).checked = true;
}
