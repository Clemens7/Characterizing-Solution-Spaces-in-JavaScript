
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
    if (keywords.length > 0 && keywords[0].includes("?q=")) else {

        gethighlights();
    }

};


    async function gethighlights() {
        const highlights = await fetch('./highlights.json');
        const hls = await highlights.json();
        //  console.log(hls.highlights);
        // console.log(hls.highlights.length);

        const artobjs = await getbyids(hls.highlights,hls.highlights.length);
        // console.log(artobjs[0]);

        for (let i = 0; i < hls.highlights.length ; i++) {
            //   console.log(artobjs[i]);

            gallery.appendChild(createArtworkElem(artobjs[i]));
        }
    }

    const form = document.querySelector('#searchsec form');

    btn();

    function btn() {
        form.addEventListener("submit", event => {

            const state = {};
            //$('#gallery').load(document.URL +  ' #gallery');
            event.preventDefault();
            const searchInput = document.getElementById('search');


            const keywords = parseInput(searchInput.value);
            var searchinfo = document.getElementById("search-info");
            searchinfo.innerHTML = `Searching for “`+ keywords.join(" ") +`”...`;
            if (!searchInput.value) 

            var args = keywords.join("+");//.replace(",","%2C");
            window.history.pushState(state, "Search.html", "?q="+args);
            //gallery.location.search =  keywords.join('+');

            gallerysearch(keywords);
        });
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
        if(artwork)  else {

            const response1 = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectids[i]}`);
            const rawdata1 = await response1.json();
            let artwork = new Art(rawdata1.objectID, rawdata1.primaryImageSmall, rawdata1.artistDisplayName, rawdata1.title, rawdata1.objectDate );
            if (!skip(artwork)) {
                returnlist.push(artwork);
                ArtworkCache.store(rawdata1.objectID, artwork);
            }
        }

        i=i+1;
    }
    // console.log(returnlist[0]);
    return returnlist;
}




function parseInput (searchinp){

        return searchinp.split(" ");
}
