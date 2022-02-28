// https://github.com/web-engineering-tuwien/recipe-search-live-demo/blob/master/dom-helpers.js

// I had a little too much fun playing with composition here
// that I created an ad-hoc DOM abstraction library
// (It's certainly not perfect, but it provides many
// helpers to construct and compose DOM elements)
export 

export function setAttributes(element, attributes) {
    for(let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if(typeof(attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}

export function textElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

export function container(elements, tag='div') {
    const container = document.createElement(tag);
    for(let element of elements) {
        container.appendChild(element);
    }
    return container;
}
