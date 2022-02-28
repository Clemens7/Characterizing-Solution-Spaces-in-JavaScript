/**
 * Sets tag attributes for the given element
 * @param {*} element 
 * @param {*} attributes 
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
 * Sets class attribute for the given element
 * @param {*} element 
 * @param {*} classes 
 */
export function setClassList(element, classes) {
    for (let className of classes) {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }
    return element;
}

/**
 * Returns new container HTML element with given tag and children
 * @param {*} children 
 * @param {*} tag (default: div)
 */
export function container(children, tag='div') {
    const container = document.createElement(tag);
    for (let child of children) {
        container.appendChild(child);
    }
    return container;
}

/**
 * Returns new HTML element of the given tag containing the given text as innerText
 * @param {*} text 
 * @param {*} tag 
 */
export function innerTextElement(text, tag) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}