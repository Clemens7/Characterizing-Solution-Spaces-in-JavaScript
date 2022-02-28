export function getAllProducts() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [];
  }
  return cart;
}

export class CObject{
  constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth){
          this.objectID = objectID;
          this.printSize = printSize;
          this.frameStyle = frameStyle;
          this.frameWidth = frameWidth;
          this.matColor = matColor;
          this.matWidth = matWidth;
          }
}

export 

export 

export 
