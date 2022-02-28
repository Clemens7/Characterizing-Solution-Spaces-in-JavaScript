import {getAllProducts, add, CObject, remove} from './cart.js';
import {getObject} from "./api.js";
import {calculatePrice, render} from "./frame.js";



export async function init(){
let cartItem = document.getElementById("template").content;
let cart1 = document.getElementById("cart");





if (getAllProducts().length === 0)  else {
    let id = 0;
  for(let cart of getAllProducts()){
    let currentObject = await getObject(cart.objectID);
    let thisItem = cartItem.cloneNode(true);
    let cartitem = thisItem.querySelectorAll("div[class='cart-item']")[0];
    cartitem.setAttribute("id", "cart-item-" + id);
    let label = thisItem.querySelectorAll("div[class='museum-label']")[0];
    let artist = thisItem.querySelectorAll("span[class='artist']")[0];
    let title = thisItem.querySelectorAll("span[class='title']")[0];
    let date = thisItem.querySelectorAll("span[class='date']")[0];
    let description = thisItem.querySelectorAll("span[class='frame-description']")[0];
    let price = thisItem.querySelectorAll("span[id='price-0']")[0];
    let img = thisItem.querySelectorAll("img[class='cart-thumb']")[0];
    let a = thisItem.querySelectorAll("a")[0];
    let removebutton = thisItem.querySelectorAll("button[class='cart-remove']")[0];
    let preview = thisItem.querySelectorAll("div[class='cart-preview']")[0];
    artist.innerHTML = currentObject.artistDisplayName;
    title.innerHTML = currentObject.title;
    date.innerHTML = currentObject.objectDate;
    let textdescription = "";
    if(cart.printSize === "S"){
    textdescription += "Small print in a ";
    }else if(cart.printSize === "M"){
    textdescription += "Medium print in a ";
    }else{
    textdescription += "Large print in a ";
    }
    let fwidth= pround(Math.max(Math.min(cart.frameWidth/10, 10), 0), 1);
    textdescription += fwidth +" cm " + cart.frameStyle + " frame";
    if(cart.matWidth === 0)else{
    let mwidth = pround(Math.max(Math.min(cart.matWidth/10, 10), 0), 1);
    textdescription += " with a " + mwidth + " cm " + cart.matColor + " mat.";
    }
    description.innerHTML = textdescription;
    price.innerHTML = parseFloat(calculatePrice(cart.printSize, cart.frameStyle, cart.frameWidth, cart.matWidth)).toFixed(2);
    a.setAttribute('href', 'config.html?objectID=' + currentObject.objectID + "&printSize=" + cart.printSize + "&frameStyle=" + cart.frameStyle
    + "&frameWidth=" + cart.frameWidth + "&matColor=" + cart.matColor + "&matWidth=" + cart.matWidth);
    img.setAttribute('src', currentObject.primaryImageSmall);
    img.setAttribute('alt', currentObject.title);
    img.setAttribute('id', 'preview-' + id);
    preview.setAttribute('id','preview-container-' + id);

    removebutton.setAttribute("id", id);
    removebutton.addEventListener("click", removeObject);
    cart1.insertBefore(thisItem, cart1.firstChild);
    render(img, preview, cart.printSize, cart.frameStyle, cart.frameWidth, cart.matColor, cart.matWidth);
  id += 1;
  }
  calctotalPrice();
  cartElements();

}


}


function pround(value, precision = 0) {
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
}
function calctotalPrice(){
  let productPrice = 0.0;
  for(let item of getAllProducts()){
      productPrice += parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
  }
   let pricetotal = document.getElementById("price-total");
   productPrice = productPrice.toFixed(2);
   pricetotal.innerText= productPrice;

}

export function cartElements(){
    let cartn = document.getElementById("cart-link");
   if(getAllProducts().length !== 0){
      cartn.innerHTML = "Cart (" + getAllProducts().length + ")";
   }
}


