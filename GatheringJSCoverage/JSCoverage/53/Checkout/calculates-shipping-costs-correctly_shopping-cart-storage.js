import { ShoppingCartItem } from './shopping-cart.js';

export function retrieve() {
  const key = 'cart';

  if (key in localStorage) {
    console.log(`Retrieving ${key} from local storage`);
    return JSON.parse(localStorage[key]);
  }
}

// Check duplicates?
export 

export 
