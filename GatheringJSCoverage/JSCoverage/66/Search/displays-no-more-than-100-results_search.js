
//////////// +++ ARTWORK +++ ///////////////
export class Artwork {
    constructor(title, artistDisplayName, objectDate, primaryImageSmall, objectID) {
        this.title = title;
        this.artistDisplayName = artistDisplayName;
        this.objectDate = objectDate;
        this.primaryImageSmall = primaryImageSmall;
        this.objectID = objectID;
    }
}


/////////// +++ RETRIEVE +++ //////////////////
export async function retrieve(q) {

    if (q in localStorage) 
    let artworks = [];
    let objectCount = 100;


    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}`;


    try {
        const response = await fetch(url);            /////// get all the relevant IDs first
        const rawData = await response.json();
        const responseArtworkIDs = await rawData.objectIDs;
        console.log(responseArtworkIDs);

        if(responseArtworkIDs.length < 100) 

        for (let i = 0; i < objectCount; i++) {              /////////// then get the objects

            let artwork = await retrieveObject(responseArtworkIDs[i]);

            artworks.push(artwork);
        }

        //store in cache

      //  console.log(artworks);

        return artworks;

    }}

async function retrieveObject(id) {

    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    const response = await fetch(url);
    const responseArtwork = await response.json();
    console.log(responseArtwork);

    let title = responseArtwork.title;
    let artistDisplayName = responseArtwork.artistDisplayName;
    let objectDate = responseArtwork.objectDate;
    let primaryImageSmall = responseArtwork.primaryImageSmall;
    let objectID = id;

    return new Artwork(title, artistDisplayName, objectDate, primaryImageSmall, objectID);
}

/////////// +++ DISPLAY +++ //////////////////

export function display(artwork, count){
        console.log(artwork);


     let div = document.createElement('div'); // build gallery element
     div.className = 'thumb';


     console.log(artwork.objectID);
     let a = document.createElement('a');
     a.href = `/config.html?objectID=${artwork.objectID}`;
     a.id = "object-" + 0;

     let img = document.createElement('img');
     img.src = artwork.primaryImageSmall;
     img.alt = "Title: " + artwork.title + " Artist: " + artwork.artistDisplayName + " Date: " + artwork.objectDate;
     img.id = "object-image-" + count;

     let divchild = document.createElement('div');
     divchild.className = 'museum-label';

     let span1 = document.createElement('span');
     span1.className = 'artist';
     span1.innerText = artwork.artistDisplayName;

     let span2 = document.createElement('span');
     span2.className = 'title';
     span2.innerText = artwork.title + ", ";

     let span3 = document.createElement('span');
     span3.className = 'date';
     span3.innerText = artwork.objectDate;

     divchild.appendChild(span1);
     divchild.appendChild(span2);
     divchild.appendChild(span3);

     a.appendChild(img);
     a.appendChild(divchild);

     div.appendChild(a);

     let gallery = document.getElementById('gallery'); // add to gallery
     gallery.appendChild(div);

}


/////////// +++ LOAD HIGHLIGHTS +++ //////////////////

export 
