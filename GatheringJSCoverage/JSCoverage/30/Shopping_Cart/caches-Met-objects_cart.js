

import { render, calculatePrice } from "./frame.js"




const fetchImage = 

 /* let cartObjects = [
    {
        "objectID": 39799,
        "frameStyle": "classic",
        "frameWidth": 35,
        "printSize": "S",
        "matColor": "coal",
        "matWidth": 13
    },
    {
        "objectID": 459055,
        "frameStyle": "natural",
        "frameWidth": 43,
        "printSize": "M",
        "matColor": "indigo",
        "matWidth": 43
    },
    {
        "objectID": 437853,
        "frameStyle": "shabby",
        "frameWidth": 32,
        "printSize":"L",
        "matColor": "mint",
        "matWidth": 33
    },
    {
        "objectID": 435809,
        "frameStyle": "elegant",
        "frameWidth": 48,
        "printSize":"S",
        "matColor": "ivory",
        "matWidth": 0
    }
] */

function retrieve(searchName) {
    const key = searchName;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);        
        return JSON.parse(localStorage[key]);
    }
}
let cart1= retrieve('cart');
if(cart1 !== undefined){
 cart1.reverse();
}


const getArtworks = async (array) => {
    const mappedData = array.map(async (cartItem) => {
        const cachedImage = JSON.parse(localStorage.getItem(cartItem.objectID))
        if(cachedImage)})
    console.log(mappedData);
    return Promise.all(mappedData)
}


getArtworks(cart1).then()
