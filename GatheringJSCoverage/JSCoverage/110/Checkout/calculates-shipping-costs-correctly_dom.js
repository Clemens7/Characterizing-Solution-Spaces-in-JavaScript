// https://github.com/web-engineering-tuwien/recipe-search-live-demo/blob/master/dom-helpers.js

export 

export 

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

export 

export 