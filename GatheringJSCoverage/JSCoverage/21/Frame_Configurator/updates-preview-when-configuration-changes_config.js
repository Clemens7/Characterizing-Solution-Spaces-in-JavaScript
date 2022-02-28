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

  get frameWidthCM() {
    return this.frameWidth/10;
  }

  set frameWidthCM(frameWidthCM) {
    this.frameWidth = frameWidthCM*10;
  }

  get matWidthCM() {
    return this.matWidth/10;
  }

  set matWidthCM(matWidthCM) {
    this.matWidth = matWidthCM*10;
  }
}

export class FramedPicture {
  constructor(picture,config,imgElement=null) {
    this.picture = picture;
    this.config = config;

    if(imgElement){
      this.imgElement = imgElement;
    }

    this.imgElement.src = picture.primaryImageSmall;
  }

  render() {
    FrameHelper.render(this.imgElement, this.imgElement.parentNode, this.config.printSize, this.config.frameStyle, this.config.frameWidth, this.config.matColor, this.config.matWidth);
  }

  //serializes given frame configuration without img
  

  static 

  static async fromObjectID(objectID,imgElement,config=new FrameConfiguration()) {
    var picture = await METAPI.api_getObject(objectID);
    return new FramedPicture(picture,config,imgElement);
  }

  //puts this frameconfiguration at index 0 of the array stored at localStorage[key], if there is no value, then a new array is created
  

  //deletes item with given id (= array index) from local storage
  static 

  //returns an array of framed images from local storage
  static async loadFromLocalStorage(key="cart") {
    const array = JSON.parse(localStorage.getItem(key));
    if(!Array.isArray(array)) {
      return [];
    }}
}

export 

export 

export 
export 
