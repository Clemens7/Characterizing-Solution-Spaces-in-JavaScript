import {Artwork} from "../models.js";
import {empty, createItem, total, enableButton, disableButton, onloadEmpty} from "./cart-dom.js?2";
import {getArtworkDetails} from "../api.js";

async function loadArtworks(){
    let stringToObject = await JSON.parse(localStorage.cart);
    console.log(stringToObject);
    let allArtworks = await getArtworks(stringToObject);
    console.log(allArtworks);


    let i = stringToObject.length-1;
    let artwork;
    let config;

    let img;
    let imgContainer;

    let price;
    let result = 0;

    let config1 = stringToObject[0].printSize;
    console.log(config1);
    while (i >= 0){
        artwork = allArtworks[i];
        config = stringToObject[i];
        createItem(i, artwork, config.printSize, config.frameStyle, config.frameWidth, config.matColor, config.matWidth);
        
        img = document.getElementById(`preview-${i}`);
        imgContainer = document.getElementById(`preview-container-${i}`);

        price = parseFloat(document.getElementById(`price-${i}`).innerText);
        console.log(price);
        result+=price;
    
        console.log(img);
        console.log(imgContainer);
        i--;
    }

    total(result.toFixed(2));
    enableButton();
    return;
}



async function getArtworks(object){
    let result = [];
    let elem;
    let artwork;
    for (elem of object){
        if(elem.objectID in localStorage) else{
            console.log(artwork);
            artwork = await getArtworkDetails(elem.objectID);
            storeInCache(artwork);
        }
        result.push(artwork);
    }
    return result;
}


function storeInCache(artwork){
    console.log(`Storing ${artwork.id} in local storage`);
    localStorage[artwork.id] = JSON.stringify(artwork);
}

const item = localStorage.getItem('cart');
if(item == null || item.length === 0 || item == '[]') else{
    loadArtworks();
}
