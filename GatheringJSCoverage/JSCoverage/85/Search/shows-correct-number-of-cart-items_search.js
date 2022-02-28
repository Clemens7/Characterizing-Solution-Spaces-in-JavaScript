import {getArtworkById, search} from "./metArtwork.js";
import * as DOM from "./domElementHelper.js"

const HIGHLIGHTS_LOCATION = "highlights.json";
const CONFIG_LOCATION = "config.html";

const query = window.location.search;
const params = new URLSearchParams(query);
let searchTerm = params.get("q");
if (!searchTerm) {
    loadDefault();
}

function load(ids) {
    ids = ids.slice(0, 100);
    let promises = ids.map(id => getArtworkById(id).then(artwork => {
        return artwork;
    }));
    Promise.all(promises).then(artworks => populateGallery(
        artworks.map((artwork) => generateThumb(artwork))
    ));
}

function loadDefault() {
    document.getElementById("search-info").innerText = "Search our collection of more than 400,000 artworks.";
    loadHighlightIds().then(results => {
        clearGallery();
        let artworks = results["highlights"];
        load(artworks);
    })
}

async function loadHighlightIds() {
    let response = await fetch(HIGHLIGHTS_LOCATION);
    return await response.json();
}

function generateThumb(artwork) {
    // Thumb template this code should generate.
    //
    // <div class="thumb">
    //   <a href="" id="object-0">
    //     <img src="" alt="" id="object-image-0">
    //     <div class="museum-label">
    //       <span class="artist"></span>
    //       <span class="title"></span>,
    //       <span class="date"></span>
    //     </div>
    //   </a>
    // </div>

    const img = document.createElement("img");
    img.setAttribute("src", artwork.image);
    img.setAttribute("alt", "");
    img.setAttribute("id", `object-image-${artwork.id}`);

    const artistSpan = DOM.getTextElement("span", artwork.artist, "artist");
    const titleSpan = DOM.getTextElement("span", artwork.title, "title");
    const dateSpan = DOM.getTextElement("span", artwork.date, "date");

    const museumLabelDiv =
        DOM.getContainer([artistSpan, titleSpan, ", ", dateSpan], "div", "museum-label");

    const a = DOM.getContainer([img, museumLabelDiv], "a");
    a.setAttribute("href", `${CONFIG_LOCATION}?objectID=${artwork.id}&printSize=L&frameWidth=40&frameWidthR=40&frameStyle=shabby&matWidth=55&matWidthR=55&matColor=mint`);
    a.setAttribute("id", `object-${artwork.id}`);

    return DOM.getContainer([a], "div", "thumb");
}

function populateGallery(thumbs) {
    let gallery = document.getElementById("gallery");
    for (let thumb of thumbs) {
        gallery.appendChild(thumb);
    }
}

function clearGallery() {
    document.getElementById("gallery").innerHTML = "";
}


