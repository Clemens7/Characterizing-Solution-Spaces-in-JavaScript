import { ArtAPI } from "./artCollectionApi.js";
import {createArtworkLabel, createArtworkImage, createContainer} from "./htmlConstructsAPI.js";

document.addEventListener('DOMContentLoaded', async event => {
    let searchQuery = (new URL(document.location)).searchParams.get('q');
    if (!searchQuery || searchQuery.length < 1) 
    await artSearch(searchQuery);
});

const api = new ArtAPI();
const input = document.getElementById("search");
const form = document.querySelector("main .search-form");
const searchHeader = document.getElementById("search-info");
const gallery = document.getElementById("gallery");
form.addEventListener("submit", );

updateCart();

async function artSearch(queryParameter) {
    if (queryParameter === "null") {
        searchHeader.innerHTML = "Found 0 artworks for “null”";
        return;
    }} for “${queryParameter}”`;
}





async function updateCart() {
    let cart = await JSON.parse(localStorage.getItem('cart'));
    if (cart) 
}
