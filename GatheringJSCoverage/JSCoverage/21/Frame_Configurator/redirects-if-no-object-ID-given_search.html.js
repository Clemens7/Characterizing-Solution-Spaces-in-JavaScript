
       import * as metAPI from './metAPI.js';
       import {Picture} from './Picture.js';
       import { SearchResultDocumentContainer } from './dom-helpers.js';
       import { FramedPicture } from './config.js';
       let Pictures = new Array();

       async function getHighlights(){
          let RawData =  await fetch('./highlights.json');
          let JSONData = await RawData.json();
          let Highlights = JSONData.highlights;
          loadPictures(Highlights);
       }


       

       async function getNumberOfCartItems() {
          let items = await FramedPicture.loadFromLocalStorage();
          if (items.length>0)
          return ;
       }

       document.addEventListener('DOMContentLoaded', event => {
                const params = (new URL(document.location)).searchParams;
                getNumberOfCartItems();
                let q = params.get('q');
                if(!q) {
                    getHighlights();
                    return;
                }});

        async function loadPictures(ObjectIds){
          const searchResultContainer = new SearchResultDocumentContainer();
          Promise.all(
            ObjectIds.slice(0,100).map(async objectId => {
              const picture = await metAPI.api_getObject(objectId);})
          )
        }

       const form = document.querySelector('#search-form');
       form.addEventListener('submit', );
    