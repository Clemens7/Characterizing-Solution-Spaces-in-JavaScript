function setAttributes(element, attributes) {
    for (let key in attributes) {
        if (typeof (attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}

function setClasses(element, classes) {
    for (let classEntry of classes) {
        element.classList.add(classEntry);
    }
    return element;
}

export function text(tag, text, attr = {}, classes = []) {
    const element = document.createElement(tag);
    element.innerText = text;
    return setAttributes(setClasses(element, classes), attr);
}

export function container(elements, tag, attr = {}, classes = []) {
    const container = document.createElement(tag);
    for (let element of elements) {
        container.appendChild(element);
    }
    return setAttributes(setClasses(container, classes), attr);;
}

export function element(tag, attr = {}, classes = []) {
    const element = document.createElement(tag);
    return setAttributes(setClasses(element, classes), attr);
}
