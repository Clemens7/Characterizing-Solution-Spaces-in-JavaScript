class MetObject {
    constructor(objectID, artist, title, date, thumbnail) {
        this.objectID = objectID;
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.thumbnail = thumbnail;
    }
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
        if (cachedResponse) {
            console.log("Cache Hit");
            cachedResponse = JSON.parse(cachedResponse);
            
            
                var metObject = new MetObject(
                    id,
                    cachedResponse.artistDisplayName,
                    cachedResponse.title,
                    cachedResponse.objectDate,
                    cachedResponse.primaryImageSmall);
    
                gallery.appendChild(createArtElement(metObject));
                return metObject;
            
            
        }

        else{
        const fetchPromise = fetch(url + id, {
            method: 'GET',
            cache: 'no-cache'
            //cache: 'only-if-cached'
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(response => {
            //console.log(response);
            localStorage.setItem(id, JSON.stringify(response));
            var metObject = new MetObject(
                id,
                response.artistDisplayName,
                response.title,
                response.objectDate,
                response.primaryImageSmall);

            gallery.appendChild(createArtElement(metObject));
            return metObject;
        });
    }
    });



}

function createArtElement(metObject) {
    const div = document.createElement('div');
    div.className = "thumb";
    div.id = "demo";
    div.innerHTML =
        `<a href="config.html?objectID=${metObject.objectID}" id="object-0">
        <img src="${metObject.thumbnail}" alt="" id="object-image-0">
        <div class="museum-label">
            <span class="artist">${metObject.artist}</span>
            <span class="title">${metObject.title}</span>,
            <span class="date">${metObject.date}</span>
        </div>
        </a>`;

    return div;
}


