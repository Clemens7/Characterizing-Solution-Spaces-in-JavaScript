/**
 * function to set attribues of html tags
 * 
 * @param element the element where the attributes shall be set
 * @param attributes the attribues to be set ({ key: value}; doesn't work for key = class!)
 */
export function setAttributes(element, attributes) {
    for (let key in attributes) {
        if (typeof(attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}

/**
 * function to create text elements like h2 or span
 * 
 * @param tag the name of the tag like h2 or spann
 * @param text the text value written in the element
 * @param {false} classe the class of the text element 
 */
export function textElement(tag, text, classe = false) {
    const element = document.createElement(tag);
    if (classe) {
        element.setAttribute('class', classe);
    }
    element.innerText = text;
    return element;
}

/**
 * a function to create a container element
 * 
 * @param  elements the elements inside this container
 * @param {'div'} tag the name of the tag like div or article
 * @param {false} classe the class of the container element
 */
export function container(elements, tag = 'div', classe = false) {
    const container = document.createElement(tag);
    if (classe) {
        container.setAttribute('class', classe);
    }
    for (let element of elements) {
        container.appendChild(element);
    }
    return container;
}
