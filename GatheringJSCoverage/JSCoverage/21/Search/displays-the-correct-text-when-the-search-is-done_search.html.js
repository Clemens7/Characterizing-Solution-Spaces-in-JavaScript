
       import * as metAPI from './metAPI.js';
       import {Picture} from './Picture.js';
       import { SearchResultDocumentContainer } from './dom-helpers.js';
       import { FramedPicture } from './config.js';
       let Pictures = new Array();

       


       async function PictureSearch(q){
          let Pictures = await metAPI.api_search(q);
          if(Pictures!=null)else{
           document.getElementById('search-info').innerText='Found '+0+' artworks for “'+q+'”';
           }
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
                if(!q) 
                q = q.replace(/\+/g," ");

                document.getElementById('search').value = q;
                document.getElementById('search-info').innerText='Searching for “'+q+'”...';
                PictureSearch(q);
       });

        

       const form = document.querySelector('#search-form');
       form.addEventListener('submit', );
    