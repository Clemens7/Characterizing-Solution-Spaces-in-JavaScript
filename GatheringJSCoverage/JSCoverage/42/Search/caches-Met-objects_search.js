
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
    if(resultFromCache){
       resultFromCache.forEach(element => {
            createAndAppendResult(element)
          
        });
        modifySearchBar("Found " + resultFromCache.length + " artworks for “" + term + "”")
        return;
    }}









function retrieveFromLocal(key){
    if(key in localStorage){
        return JSON.parse(localStorage[key]);
    }
}



