class MetObject {
    
}


urlParams = new URLSearchParams(window.location.search);
queryParam = urlParams.get("q");


var artCount;
var metObjectIds;
var metObjects


if (queryParam != null) 
else {
    getHighlights();
}





function getHighlights() {

    const fetchPromise = fetch('highlights.json', {
        method: 'GET',
        cache: 'no-cache'
    });

    fetchPromise.then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        retrieveArtfromIds(response.highlights.slice(0, 100));
    });

}

function retrieveArtfromIds(ids) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const gallery = document.getElementById('gallery');
    console.log(ids.length);

    ids.forEach(id => {


        var cachedResponse = localStorage.getItem(id);
        if (cachedResponse) 

        else{
        const fetchPromise = fetch(url + id, {
            method: 'GET',
            cache: 'no-cache'
            //cache: 'only-if-cached'
        });

        fetchPromise.then().then();
    }
    });



}




