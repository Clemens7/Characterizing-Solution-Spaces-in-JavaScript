
import * as ArtworkCache from './artwork-cache.js'
import * as NavigationBar from './navigation-bar.js';
window.onload = function () {
NavigationBar.displayCartSize();

    function getUrlVars() {
        var vars = [];
        let i = 0;
        var parts = window.location.href.replace(/([^+?=]+)=?([^+]*)/gi, function ( value) {
           vars[i]=value;
           i=i+1;
        });
        return vars;
    }
    const keywords = getUrlVars();

    console.log(keywords);
    if (keywords.length > 0 && keywords[0].includes("?q=")){
        var searchinfo = document.getElementById("search-info");
        keywords[0] = keywords[0].split("=")[1];
        searchinfo.innerHTML = `Searching for “`+ keywords.join(" ") +`”...`;
        console.log(keywords);
        gallerysearch(keywords);

    }

};


    

    const form = document.querySelector('#searchsec form');

    btn();

    function btn() {
        form.addEventListener("submit", );
    }

class Art{
    constructor(id, image, artist,title, date){
        this.id = id;
        this.image = image;
        this.artist= artist;
        this.title = title ;
        this.date=date;

    }

}
async function gallerysearch(keywords) {

    const foundartwork = await getArtwork(keywords);

    var searchinfo = document.getElementById("search-info");

    var kws = keywords.join(" ");
    kws = kws.replace("+"," ");
   // kws = kws.replace("%2C",",");
    if(foundartwork){

        if (foundartwork.length === 1)else {
            searchinfo.innerHTML = `Found `+ foundartwork.length +` artworks for “`+kws+`”`;
        }



        const gallery = document.getElementById("gallery");

        //document.location.search = keywords.join('+');
        gallery.innerHTML = '';
        let i = 0 ;
        while (i < foundartwork.length){
            //  console.log(foundartwork[i]);
            gallery.appendChild(createArtworkElem(foundartwork[i]));
            i = i+1;
        }
    }



    // console.log();
    //add artwork to document

}



function createArtworkElem(artwork){
      const elem = document.createElement("class");
    console.log(artwork);
    console.log(artwork.id);
    console.log(artwork.image);
    console.log(artwork.artist);
    console.log(artwork.title);
   // console.log(artwork.image.toString());
    elem.innerHTML =`<div class="thumb">
        <a href="./config.html?objectID=${artwork.id}" id="${artwork.id}">
          <img src="${artwork.image}" alt="" >
          <div class="museum-label">
            <span class="artist">${artwork.artist}</span>
            <span class="title">${artwork.title}</span>,
            <span class="date">${artwork.date}</span>
          </div>
        </a>
      </div>`;

    return elem;

}




async function getArtwork(keywords) {

    // check if stored
    let artwork = ArtworkCache.retrieve(keywords);
    if(artwork)  else {
        //retrieve from outside
        function serializeKeywords(keywords){
            return keywords.join("+");
        }

        const args = (serializeKeywords(keywords)).replace(",","%2C");
        console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${args}&hasImages=true`);
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${args}&hasImages=true`);


        const rawdata = await response.json();

        var returnlist = [];
        if(rawdata.total === 0) else {
        returnlist = await getbyids(rawdata.objectIDs, rawdata.total);
        return returnlist;
        }
    }}

async function getbyids( objectids, length) {

        function skip(artwork){
            if (artwork.primaryImageSmall)

        }


    var i = 0 ;
    var returnlist = [];

    while (i<100 && i< length){
        //console.log(objectids[i]);

        let artwork = ArtworkCache.retrieve(objectids[i]);
        if(artwork) {
            if (!skip(artwork)){
                console.log('=========');
                console.log('OBJECTID');
                console.log(artwork.objectID);
                console.log(artwork.id);
                console.log('=========');
                returnlist.push(new Art(artwork.id, artwork.image, artwork.artist, artwork.title, artwork.date));
            }
        }

        i=i+1;
    }
    // console.log(returnlist[0]);
    return returnlist;
}





