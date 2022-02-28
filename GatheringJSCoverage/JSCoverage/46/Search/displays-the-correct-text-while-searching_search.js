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
    if (queryParameter === "null") 
    searchHeader.innerText = `Searching for “${queryParameter}”...`;
    const response = await api.getObjectsIdBySearchparameter(queryParameter);
    const ids = response["objectIDs"].slice(0, 100);
    const length = ids.length;
    await createContent(ids);
    searchHeader.innerText = `Found ${length} artwork${length !== 1 ? "s" } for “${queryParameter}”`;
}



async function createContent(ids = []) {
    if(ids.length < 1)
    let index = 0, entries = [], entry;
    for (const id of ids) {
        entries.push(api.getObjectById(id));
    }
    for(const promise of entries){
        entry = await promise;
        if(!window.localStorage.getItem(entry["objectID"])){
            window.localStorage.setItem(entry["objectID"], JSON.stringify(entry));
        }
        const image = createArtworkImage(entry, index++);
        const label = createArtworkLabel(entry);
        const link = createContainer([image, label], "a", "",
            [ ["href", `config.html?objectID=${entry.objectID}`], ["id", "object-" + index] ]);
        gallery.appendChild(createContainer([link], "div", "thumb"));
    }
}

async function updateCart() {
    let cart = await JSON.parse(localStorage.getItem('cart'));
    if (cart) 
}
