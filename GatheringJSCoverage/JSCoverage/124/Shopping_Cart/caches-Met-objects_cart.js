import { CartItem } from "./cart-item.js";
import { ResultItem } from "./result-item.js";
import { CartContainer } from "./cart-container.js";
import * as Frame from "./frame.js";
import * as ElementCreator from './element-creator.js';



export 

export async function retrieveItem(objId) {
  let cached = localStorage.getItem(objId);
  if (cached) 
  response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objId);
  let item = await response.json();}

export async function displayItems(items) {
  const cartContainer = new CartContainer();
  cartContainer.clear();
  let priceTotal = 0;
  for (let item of items) {
    let cached = localStorage.getItem(item.objectID);
    if (cached) 
    else {
      retrieveItem(item.objectID).then();
    }

  }



}

export 

export 

export 


// TODO Make a Js file for utility functions like this one.
export 

export 

