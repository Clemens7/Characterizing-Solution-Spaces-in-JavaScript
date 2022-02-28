
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





