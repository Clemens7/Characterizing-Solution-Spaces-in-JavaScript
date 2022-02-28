import {getPrintSizes, render, calculatePrice} from "./frame.js";

export class ResultContainer {
    

    

    
}

export class ConfigImage{

    constructor() {
        this.configImage = document.getElementById("preview-container")
    }

    clear(){
        this.configImage.innerHTML = "";
    }

    addArtworkFrame(artwork,printSize,frameWidth,frameStyle,matColor,matWidth){

        const label = document.createElement('div');
        label.classList.add("museum-label");

        const artist = document.createElement('span');
        artist.classList.add("artist");
        artist.innerText = artwork.artist;

        const title = document.createElement('span');
        title.classList.add("text");
        title.innerText = artwork.title+ ", " + artwork.date;

        label.appendChild(artist);
        label.appendChild(title);
        label.classList.add("museum-label");
        label.id = "image-label";
        const cont = document.createElement('div');
        cont.id = "cont";
        const image = document.createElement('img');
        image.src = artwork.image;
        image.alt = `Picture of artwork ${artwork.title}`;
        image.id = `object-image-${artwork.id}`;
        image.id = "preview-image";

        image.style.maxWidth="500px";
        image.style.maxHeight="400px";
        cont.appendChild(image);
        this.configImage.appendChild(cont);
        this.configImage.appendChild(label);


        printSize = document.querySelector('input[name="printSize"]:checked').value;
        frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
        frameWidth = document.getElementsByName("frameWidth")[0].value;
        matColor = document.querySelector('input[name="matColor"]:checked').value;
        matWidth = document.getElementsByName("matWidth")[0].value;

        const imgs = new Image;
        imgs.onload = function waitForLoadingImage() {render(document.getElementById("preview-image"),document.getElementById("cont"),
            printSize,frameStyle,frameWidth,matColor,matWidth,true)};
        imgs.src=artwork.image;

    }
}

export class DisplayCart {
    

    

    

    
}





