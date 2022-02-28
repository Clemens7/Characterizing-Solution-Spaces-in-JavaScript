export function create_Container(els, tag, classes = [], attrs = {}) {
    const container = document.createElement(tag);
    addAttrs(container, attrs);
    addClasses(container, classes);
    for (let el of els) {
        container.appendChild(el);
    }

    return container;

}

export 

export function create_TextElement(tag, text, attrs = {}, classes = []) {
    const el = document.createElement(tag);
    el.innerText = text;
    addAttrs(el, attrs);
    addClasses(el, classes);
    return el;
}

function addAttrs(element, attrs = {}) {
    if (Object.keys(attrs).length > 0) {
        for (var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }
}

function addClasses(element, classes = []) {
    if (classes.length > 0) {
        element.classList.add(classes);
    }
}
