import { ArtAPI } from "./artCollectionApi.js";
import {createArtworkLabel, createArtworkImage, createContainer} from "./htmlConstructsAPI.js";

document.addEventListener('DOMContentLoaded', async event => {
    let searchQuery = (new URL(document.location)).searchParams.get('q');
    if (!searchQuery ) {
        await artHighlights();});

const api = new ArtAPI();
const input = document.getElementById("search");
const form = document.querySelector("main .search-form");
const searchHeader = document.getElementById("search-info");
const gallery = document.getElementById("gallery");
form.addEventListener("submit", );

updateCart();



async function artHighlights() {
    const data = await fetch("highlights.json");
    const highlights = await data.json();
    await createContent(highlights["highlights"]);}

async function createContent(ids = []) {
    if(ids.length < 1)
    let index = 0, entries = [], entry;
    for (const id of ids) {
        entries.push(api.getObjectById(id));
    }
    for(const promise of entries){
        entry = await promise;}

async function updateCart() {
    let cart = await JSON.parse(localStorage.getItem('cart'));
    if (cart) 
}
