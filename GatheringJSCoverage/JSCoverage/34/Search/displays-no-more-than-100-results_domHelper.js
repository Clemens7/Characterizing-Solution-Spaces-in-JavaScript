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
export function img(src, alt, id) {
    const element = document.createElement('img');
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
    element.setAttribute('id', id);
    return element;
}

/**
 *
 * Creates an html anchor element, takes multiple other dom elements
 *
 * @param elements array of other dom elements
 * @param href link to another page
 * @param id of the image
 * @returns {HTMLAnchorElement}
 */
export function linkContainer(elements, href,  id) {
    const container = document.createElement('a')
    container.setAttribute('href', href);
    container.setAttribute('id', id);
    for (let element of elements){
        container.appendChild(element);
    }
    return container
}

export 

export 

export 

export 

export 


export 

export 

export 
export 