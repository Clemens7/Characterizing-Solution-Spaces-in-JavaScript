import {getPrintSizes} from "../frame.js";
import {updateDom} from "./config.js";
import {retrieve} from "./cache.js";

let imgTag = document.getElementById('preview-image');
let urlParams = new URLSearchParams(window.location.search);
setIMG(urlParams.get('objectID'));

let img = document.getElementById('preview-image');
img.addEventListener("load", function () {
    //set print sizes
    let imgSizes = getPrintSizes(imgTag);
    console.log(imgSizes);
    console.log("hello");
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${imgSizes['S'][0]} × ${imgSizes['S'][1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${imgSizes['M'][0]} × ${imgSizes['M'][1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${imgSizes['L'][0]} × ${imgSizes['L'][1]} cm`;
    updateDom();
});

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
