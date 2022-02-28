
document.addEventListener('DOMContentLoaded', event => {
    //ingredients
    if(retrieveFromLocal("cart"))else{
        addCart(0)
    }
    const params = (new URL(document.location)).searchParams;
    const termQuery = params.get('q');
    if (!termQuery) {
      retrieveHighlights();
        return;
    }});

const form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', );

async function retrieveHighlights(){
    var req=new XMLHttpRequest();
    req.open("GET",'/highlights.json',true);
    req.send();
    req.onload=function(){
        json=JSON.parse(req.responseText);
    retrieveDetails(null,json.highlights)
    }
      
}



function retrieveDetails(term,ids){
    var objects = [];
    const promises = ids.map(word => new Promise(resolve => {
        var url_obj = api_url_object(word);
        fetch(url_obj).then(response => response.json())
            .then(result => {
                createAndAppendResult(result)
                resolve(result)})


    }));

    Promise.all(promises).then(results => {
        objects = results
        console.log(objects)
        if(term) 
            if(term)


    })
}



function api_url_object(term) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${term}`;
    return (API_URL);
}



function retrieveFromLocal(key){
    if(key in localStorage)
}



