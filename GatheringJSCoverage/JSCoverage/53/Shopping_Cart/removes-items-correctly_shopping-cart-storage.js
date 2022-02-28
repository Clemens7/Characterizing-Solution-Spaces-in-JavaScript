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

export function store(items) {
  const key = 'cart';
  console.log(`Storing ${key}s in local storage`);
  localStorage[key] = JSON.stringify(items);
}
