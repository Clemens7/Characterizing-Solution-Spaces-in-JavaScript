export function textElement(tag, text, className = null) {
    const element = document.createElement(tag);
    element.innerText = text;
    if (className) {
        element.className = className;
    }
    return element;
}

export 

export function imageElement(src, alt) {
    const element = document.createElement("img");
    element.src = src;
    element.alt = alt;
    return element;
}

export function element(tag, className) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
}

export function container(elements, tag = 'div', className = null, attributes = null, href = null) {
    const container = document.createElement(tag);
    for (let element of elements) {
        container.appendChild(element);
    }
    if (className) {
        container.className = className;
    }
    if (attributes) 
    if (tag == 'a' && href) 
    return container;
}

