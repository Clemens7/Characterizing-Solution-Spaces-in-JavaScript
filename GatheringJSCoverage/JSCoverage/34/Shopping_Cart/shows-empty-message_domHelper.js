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
export 


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

export 

export 

export 

export 

export 


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
    if(state) {
        container.setAttribute('disabled',true);
    }
    container.innerHTML="Checkout";
    container.addEventListener('click',)
    return container;
}

export 
export 