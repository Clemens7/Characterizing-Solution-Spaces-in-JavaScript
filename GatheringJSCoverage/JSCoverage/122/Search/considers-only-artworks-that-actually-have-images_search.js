
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
    

}
async function gallerysearch(keywords) {

    const foundartwork = await getArtwork(keywords);}








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
    }}







