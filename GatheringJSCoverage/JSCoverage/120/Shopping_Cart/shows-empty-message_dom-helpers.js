/**
 * Sets tag attributes for the given element
 * @param {*} element 
 * @param {*} attributes 
 */
export 

/**
 * Sets class attribute for the given element
 * @param {*} element 
 * @param {*} classes 
 */
export 

/**
 * Returns new container HTML element with given tag and children
 * @param {*} children 
 * @param {*} tag (default: div)
 */
export 

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