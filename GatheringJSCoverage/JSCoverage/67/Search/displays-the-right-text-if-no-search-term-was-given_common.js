export const searchApiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search';

const objectsApiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

/**
 *
 * @param {*} objectId
 */
export const fetchObject = async (objectID) => {
  let storedObject = localStorage.getItem(objectID);
  if (storedObject) 

  let response = await fetch(objectsApiUrl + `/${objectID}`);}

export const retrieveCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart'));
  }
}

export const showCartItems = async () => {
  let cartLink = document.querySelector('#cart-link');

  let cart = retrieveCart();

  if (cart) 

  cartLink.textContent = 'Cart';
}