import { getPrintSizes, render, calculatePrice } from "./frame.js";

var configContent = localStorage.getItem("cart");
var configContentJSON = JSON.parse(configContent);
const image = document.getElementById("preview-0");
const container = document.getElementById("preview-container-0");
const label = document.getElementById("museum-label-0");
console.log(configContentJSON);
const btn = document.querySelector("button.cart-remove");
var priceSum = 0;
console.log(btn);



document.addEventListener('DOMContentLoaded', (event) => {
    /*
    console.log("TEST");
    console.log("ObjID: " + configContentJSON.objectID);
    console.log("PrintSize: " + configContentJSON.printSize);
    console.log("FrameStyle: " + configContentJSON.frameStyle);
    console.log("FrameWidth: " + configContentJSON.frameWidth);
    console.log("MatColor: " + configContentJSON.matColor);
    console.log("MatWidth: " + configContentJSON.matWidth);
    */
    if(configContentJSON != null) {
        for(var i = 0; i < configContentJSON.length; i++) {
        retrieveArtfromId(configContentJSON[i].objectID);
        render(image, container, configContentJSON[i].printSize, configContentJSON[i].frameStyle, (configContentJSON[i].frameWidth * 10), configContentJSON[i].matColor, (configContentJSON[i].matWidth * 10));
        createDescription(configContentJSON[i].objectID,configContentJSON[i].printSize,configContentJSON[i].frameStyle,configContentJSON[i].frameWidth,configContentJSON[i].matColor,configContentJSON[i].matWidth)
        }
    }
    
    
});

function retrieveArtfromId(id) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    console.log(id);

    const fetchPromise = fetch(url + id, {
        method: 'GET'
        //cache: 'only-if-cached'
    });

    fetchPromise.then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        if(response.message == "Not Found" || response.message == "ObjectID not found")
        

        var imageURL = response.primaryImageSmall;
      
        image.src = imageURL;

        var imgLink = document.querySelector("div.cart-preview > a");
        imgLink.href = `config.html?objectID=${id}`;

});
}

function createDescription(id, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    console.log(id);

    const fetchPromise = fetch(url + id, {
        method: 'GET'
        //cache: 'only-if-cached'
    });

    fetchPromise.then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        if(response.message == "Not Found" || response.message == "ObjectID not found")
        

        var artist = response.artistDisplayName;
        var title = response.title;
        var date = response.objectDate;

        //const div = document.getElementById(label);

        console.log(artist);
        console.log(title);
        console.log(date);

        var size;

        switch(printSize) {
            case 'M':
                size = "Medium"
                break;
            case 'S':
                size = "Small"
                break;
            
        }

        var matInfo;

        if(matWidth != 0) {
            matInfo = `with a ${matWidth} cm ${matColor} mat.`
        }

        var price = calculatePrice(printSize,frameStyle,frameWidth,matWidth)

        label.innerHTML = 
        `<div>
            <span class="artist">${artist}</span>
            <span class="title">${title}</span>
            <span class="date">${date}</span>
            <br><br>
            <span class="frame-description">${size} print in a ${frameWidth} cm ${frameStyle} frame ${matInfo}</span>
        </div>
        <div class="cart-price">€ <span id="price-0">${price}</span></div>
        <button type="button" class="cart-remove"></button>
        `
        priceSum = priceSum - (-price);

        var totalDiv = document.getElementById('price-total')
    
        totalDiv.innerText = `${priceSum}`
    });

    btn.onclick = ;

}