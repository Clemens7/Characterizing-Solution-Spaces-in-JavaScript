import {loadCartSize} from "./cart.js";

loadCartSize();

const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', query);

document.addEventListener('DOMContentLoaded', event => {
    query3();
});



function query3() {
    const params = (new URL(document.location)).searchParams;
    const qQuery = params.get('q');

    if (!qQuery) {
        readFile(`highlights.json`)
            .then(highlights => highlights.forEach(id => getObject(id)
                .then()));
        return;
    }}



async function readFile(path) {
    let readFile = await fetch(path);
    let text = await readFile.json();
    return text.highlights;
}

async function getObject(id) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);}





