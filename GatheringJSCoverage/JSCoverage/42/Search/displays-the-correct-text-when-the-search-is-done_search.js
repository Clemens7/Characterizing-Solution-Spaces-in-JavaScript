
document.addEventListener('DOMContentLoaded', event => {
    //ingredients
    if(retrieveFromLocal("cart"))else{
        addCart(0)
    }
    const params = (new URL(document.location)).searchParams;
    const termQuery = params.get('q');
    if (!termQuery) 
    document.getElementById('search').value = termQuery;
    console.log(termQuery)
    retrieve(termQuery);
});

const form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', );



async function retrieve(term) {
    modifySearchBar("Searching for “" + term + "”...")
    clear();
    let resultFromCache = retrieveFromLocal(term);
    if(resultFromCache)
    const url = api_url_search(term);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const responseIds = await rawData.objectIDs;
       
        if (!responseIds) {
            modifySearchBar("Found 0 artworks for “" + term + "”");
            return;
        }}




function api_url_search(term) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${term}`;
    return (API_URL);
}




function retrieveFromLocal(key){
    if(key in localStorage)
}



