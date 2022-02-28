
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

        const artobjs = await getbyids(hls.highlights,hls.highlights.length);}

    const form = document.querySelector('#searchsec form');

    btn();

    function btn() {
        form.addEventListener("submit", );
    }

class Art{
    

}











async function getbyids( objectids, length) {

        


    var i = 0 ;
    var returnlist = [];

    while (i<100 && i< length){
        //console.log(objectids[i]);

        let artwork = ArtworkCache.retrieve(objectids[i]);
        if(artwork)  else {

            const response1 = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectids[i]}`);
        }}





