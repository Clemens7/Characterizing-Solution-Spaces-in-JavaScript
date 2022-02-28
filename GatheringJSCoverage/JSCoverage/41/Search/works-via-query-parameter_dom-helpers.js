/*
 * Set multiple attributes defined in the input parameter attributes for the element given in the input parameter
 * element.
 *
 * element is an element described at https://developer.mozilla.org/en-US/docs/Web/API/Element
 * attributes is a object with key: value pairs
 */
export function setAttributes(element, attributes) {
    for(let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if(typeof(attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}

/*
 * Create a text element.
 *
 * tag: tag of the element
 * text: the text (input) of the element
 */
export 

/*
 * Creates a new element with the specified tag and with elements in the input parameter elements as children.
 *
 * elements is an array of elements (https://developer.mozilla.org/en-US/docs/Web/API/Element)
 */
export function container(elements, tag='div') {
    const container = document.createElement(tag);
    for(let element of elements) {
        container.appendChild(element);
    }
    return container;
}

/*
 * Creates a new element with the specified tag and with elements in the input parameter elements as children.
 *
 * elements is an array of elements (https://developer.mozilla.org/en-US/docs/Web/API/Element)
 */
export function containerWithAttributes(elements, attributes, tag='div') {
    return setAttributes(container(elements, tag), attributes);
}
