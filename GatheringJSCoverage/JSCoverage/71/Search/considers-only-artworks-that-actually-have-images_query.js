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

    if (!qQuery) 

    let searchLabel = document.getElementById('search-info');
    qQuery.replace("+", " ");

    searchLabel.innerHTML = `Searching for “${qQuery}”...`;

    search(qQuery).then();

}







async function search(query) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);}



