import * as FrameHelper from './frame.js';
import * as METAPI from './metAPI.js';

/**
frameWidth and matWidth are given in mm
*/
export class FrameConfiguration {
  

  

  

  

  

  
}

export class FramedPicture {
  

  

  //serializes given frame configuration without img
  

  static 

  static 

  //puts this frameconfiguration at index 0 of the array stored at localStorage[key], if there is no value, then a new array is created
  

  //deletes item with given id (= array index) from local storage
  static 

  //returns an array of framed images from local storage
  static 
}

export function loadCartInformationFromLocalStorage(key="cart"){
  const array = JSON.parse(localStorage.getItem(key));
  if(!Array.isArray(array)) 
  return array;
}

export function calculateTotalCartPrice(){
  const data = loadCartInformationFromLocalStorage();
  let totalPrice = 0;
  data.forEach((item) => {
    totalPrice += parseFloat(FrameHelper.calculatePriceForItem(item))
  });
  return totalPrice
}

export 
export function cartIsEmpty(){
  const data = loadCartInformationFromLocalStorage();
  return !(data.length > 0)
}
