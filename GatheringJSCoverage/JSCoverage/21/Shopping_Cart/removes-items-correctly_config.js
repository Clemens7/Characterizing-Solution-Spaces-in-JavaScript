import * as FrameHelper from './frame.js';
import * as METAPI from './metAPI.js';

/**
frameWidth and matWidth are given in mm
*/
export class FrameConfiguration {
  constructor(printSize='S',frameStyle="classic",frameWidth=30,matColor="mint",matWidth=10) {
    this.printSize = printSize;
    this.frameStyle = frameStyle;
    this.frameWidth = frameWidth;
    this.matColor = matColor;
    this.matWidth = matWidth;
  }

  get price() {
    return FrameHelper.calculatePrice(this.printSize, this.frameStyle, this.frameWidth, this.matWidth);
  }

  

  

  

  
}

export class FramedPicture {
  constructor(picture,config,imgElement=null) {
    this.picture = picture;
    this.config = config;

    if(imgElement)
    else {
      this.imgElement = document.createElement('img');
    }

    this.imgElement.src = picture.primaryImageSmall;
  }

  

  //serializes given frame configuration without img
  

  static async fromJsonString(json,imgElement=null) {
    var data = json;
    var picture = await METAPI.api_getObject(data.objectID);
    return new FramedPicture(picture,new FrameConfiguration(data.printSize,data.frameStyle,data.frameWidth, data.matColor,data.matWidth),imgElement);
  }

  static 

  //puts this frameconfiguration at index 0 of the array stored at localStorage[key], if there is no value, then a new array is created
  

  //deletes item with given id (= array index) from local storage
  static async deleteFromLocalStorage(id) {
    if (id < 0) 
    const array = JSON.parse(localStorage.getItem('cart'));
    if (id >= array.length) 
    console.log('before');
    console.log(array);
    array.splice(id, 1);
    console.log('after');
    console.log(array);
    localStorage.setItem('cart', JSON.stringify(array))
  }

  //returns an array of framed images from local storage
  static async loadFromLocalStorage(key="cart") {
    const array = JSON.parse(localStorage.getItem(key));
    if(!Array.isArray(array)) 
    const loadingImages = array.map(jsonString=>this.fromJsonString(jsonString));
    const pictures = await Promise.all(loadingImages);
    return pictures;
  }
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
