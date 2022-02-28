/**
 * Based on 
 * https://github.com/web-engineering-tuwien/recipe-search-live-demo/blob/master/dom-helpers.js
 * © Jürgen Cito
 */

export 

export function setAttributes(element, attributes) {
  for(let key in attributes) {
      if(key === 'class'){
        setClasses(element, attributes[key]);
        continue;
      }
      

      // deals with more deeply structured attributes (e.g., style)
      if(typeof(attributes[key]) === 'object')  else {
          element[key] = attributes[key];
      }
  }
  return element;
}

export 

export function textElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}

export function container(elements, tag='div') {
  const container = document.createElement(tag);
  for(let element of elements) {
      container.appendChild(element);
  }
  return container;
}

export function img(src, alt="") {
  const element = document.createElement('img');
  setAttributes(element, {src, alt});
  return element;
}

export function setClasses(element, classes){
  return element.className = classes.join(',');
}