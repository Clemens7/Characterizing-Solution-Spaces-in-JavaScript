// copyright https://github.com/web-engineering-tuwien/recipe-search-live-demo/blob/master/dom-helpers.js
export function setAttributes(element, attributes) {
    for (let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if (typeof(attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}
export function addCSSClass(element, classes) {
    for (let cls of classes) {
        // deals with more deeply structured attributes (e.g., style)
        element.classList.add(cls);
    }
    return element;
}

export function textElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

export function container(elements, tag = 'div') {
    const container = document.createElement(tag);
    for (let element of elements) {
        container.appendChild(element);
    }
    return container;
}