export function getTextElement(tag = "div", text = "", classList = "", id = "") {
    const element = document.createElement(tag);
    element.innerText = text;
    element.classList.add(...classList.split(" "));
    element.id = id;
    return element;
}

export function getContainer(contents, tag = "div", classList = "") {
    const container = document.createElement(tag);
    for (let content of contents) {
        if (typeof content === "string") content = document.createTextNode(content);
        container.appendChild(content);
    }
    if (classList.length === 0) {
    } else if (classList.includes(" "))  else {
        container.classList.add(classList);
    }
    return container;
}
