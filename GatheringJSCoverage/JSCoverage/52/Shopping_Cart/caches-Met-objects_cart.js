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

function localStorageToArtworks(elem){
    let objInCache;

    let artwork;

    objInCache = JSON.parse(localStorage.getItem(elem.objectID));
    let id = objInCache.id;
    let artist = objInCache.artist;
    let title = objInCache.title;
    let date = objInCache.date;
    let img = objInCache.img;
    //let artwork = new Artwork(id,title,artist,date,img);
    artwork = new Artwork(id,title,artist,date,img);
    return artwork;
}

async function getArtworks(object){
    let result = [];
    let elem;
    let artwork;
    for (elem of object){
        if(elem.objectID in localStorage){
            artwork = localStorageToArtworks(elem);
        }
        result.push(artwork);
    }
    return result;
}




const item = localStorage.getItem('cart');
if(item == null || item.length === 0 || item == '[]') else{
    loadArtworks();
}
