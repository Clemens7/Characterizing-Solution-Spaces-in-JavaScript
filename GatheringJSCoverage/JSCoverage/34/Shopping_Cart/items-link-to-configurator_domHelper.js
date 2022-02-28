import {removeFromLocalStorage} from "./searchService.js";

/**
 *
 * Creates an html container element, takes multiple other dom elements
 *
 * @param elements array of other dom elements
 * @param tag the tag for this container element, default 'div', only use valid html tags
 * @param theClass class value for container element
 * @returns html container element
 */
export function container(elements, tag='div', theClass) {
    const container = document.createElement(tag);
    container.setAttribute('class', theClass);
    for (let element of elements){
        container.appendChild(element);
    }
    return container;
}

/**
 *
 * Creates a single html text element
 *
 * @param text content of the text element
 * @param tag of the text element, only use valid html text element tags
 * @param theClass class value for container element
 * @returns html text element
 */
export function textElement(text, tag, theClass) {
    const element = document.createElement(tag);
    element.setAttribute('class', theClass);
    element.innerText = text;
    return element;
}


/**
 *
 * Creates an html image element
 *
 * @param src url for the used image
 * @param alt alttext for the image
 * @param id of the image
 * @returns {HTMLImageElement}
 */
export 

/**
 *
 * Creates an html anchor element, takes multiple other dom elements
 *
 * @param elements array of other dom elements
 * @param href link to another page
 * @param id of the image
 * @returns {HTMLAnchorElement}
 */
export 

export function containerWithID(elements, tag='div', theClass,id) {
    const container = document.createElement(tag);
    container.setAttribute('class', theClass);
    container.setAttribute('id',id);
    for (let element of elements){
        container.appendChild(element);
    }
    return container;
}

export 

export function linkContainerNoID(elements, href) {
    const container = document.createElement('a')
    container.setAttribute('href', href);
    for (let element of elements){
        container.appendChild(element);
    }
    return container
}

export function containerNoClass(elements, tag='div') {
    const container = document.createElement(tag);
    for (let element of elements){
        container.appendChild(element);
    }
    return container;
}

export function btn(tag,theClass,objectId, index) {
    const container = document.createElement(tag);
    container.setAttribute('class', theClass);
    container.addEventListener('click',)
    return container;
}


export function textElementWithoutclass(text, tag,id) {
    const element = document.createElement(tag);
    element.setAttribute('id',id);
    element.innerText = text;
    return element;
}

export function btnCheckout(tag,type,id,state) {
    const container = document.createElement(tag);
    container.setAttribute('type', type);
    container.setAttribute('id',id);
    if(state) 
    container.innerHTML="Checkout";
    container.addEventListener('click',)
    return container;
}

export function imgWithClass(src, alt, id,theClass) {
    const element = document.createElement('img');
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
    element.setAttribute('id', id);
    element.setAttribute('class',theClass);
    element.setAttribute('width', "100%");
    element.setAttribute('height', "100%");
    return element;
}
export function frameDescription(printSize, frameStyle, frameWidth, matColor, matWidth, tag, theClass) {
    const element = document.createElement(tag);
    element.setAttribute('class', theClass);
    switch (printSize) {
        case 'S': printSize="Small";
            break;
        case 'M': printSize="Medium";
            break;
        case 'L': printSize="Large";
            break;
        

    }
    if(matWidth==0)else {
        element.innerText = printSize + ' print in a ' + frameWidth/10 + ' cm ' + frameStyle + ' frame with a ' + matWidth/10 + ' cm ' + matColor + ' mat.';
    }
    return element;
}