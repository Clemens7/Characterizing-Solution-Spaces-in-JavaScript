import {getPrintSizes} from "../frame.js";
import {updateDom} from "./config.js";
import {retrieve} from "./cache.js";

let imgTag = document.getElementById('preview-image');
let urlParams = new URLSearchParams(window.location.search);
setIMG(urlParams.get('objectID'));

let img = document.getElementById('preview-image');
img.addEventListener("load", );

async function setIMG(objectid) {
    console.log(objectid);
    //check objectid
    if (objectid == undefined) 
    let museumResponse = await retrieve(objectid);
    console.log(museumResponse);
// show the picture
    console.log("image");
    console.log(imgTag);
    let picture = museumResponse.image;
    if (picture == undefined) 
    console.log("hello");
    imgTag.src = picture;
    let imgLabel = document.getElementById('image-label');
    let test = createLabel(museumResponse.artist,museumResponse.title,museumResponse.date);
    imgLabel.innerHTML = test;

}

function createLabel(artist, title, time) {
    return `<p><b>${artist}</b></p>
                 <div><em>${title}, </em><span>${time}</span></div>`;
}
