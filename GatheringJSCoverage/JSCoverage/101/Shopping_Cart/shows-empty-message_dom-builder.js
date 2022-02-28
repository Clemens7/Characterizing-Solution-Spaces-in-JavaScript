export 

export 

export function createTextElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}