export function setAttributes(element, attributes) {
  for (let key in attributes) {
    if (typeof(attributes[key]) === 'object')  else {
      element[key] = attributes[key];
    }
  }
  return element;
}

export function container(tag = 'div', elements, text = '') {
  let container = document.createElement(tag);
  container.innerText = text;
  for (let element of elements) {
    container.appendChild(element);
  }
  return container;
}

export function createTextElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}