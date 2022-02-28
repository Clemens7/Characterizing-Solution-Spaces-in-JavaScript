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
  }
  return element;
}

export 

export function textElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}

export 

export 

export function setClasses(element, classes){
  return element.className = classes.join(',');
}