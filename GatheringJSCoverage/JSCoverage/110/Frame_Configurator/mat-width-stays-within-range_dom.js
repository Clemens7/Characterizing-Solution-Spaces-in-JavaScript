// https://github.com/web-engineering-tuwien/recipe-search-live-demo/blob/master/dom-helpers.js

export 

export function setAttributes(element, attributes) {
    for (let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if (typeof (attributes[key]) === 'object')  else {
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

export 

export function onReady(callback) {
    if (typeof callback === "function") {
        document.addEventListener('DOMContentLoaded', callback)
    }
}

export function onFormSubmit(id, callback) {
    if (typeof callback === "function") {
        const form = document.forms[id];
        form.addEventListener('submit', );
    }
}

export function getInputElementByName(name) {
    return document.querySelector(`input[name="${name}"]`);
}