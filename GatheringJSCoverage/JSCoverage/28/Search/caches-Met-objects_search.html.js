
	 
	import * as cache from './localStorageCahe.js';
  import { Picture } from './localStorage.js';
  import * as frame from './frame.js';

    let index = 0;

	/*class Picture{
		constructor(image,title,artist,date){
			this.image=image;
			this.artist=artist;
			this.title=title;
			this.date=date;
		}
	}*/

    document.addEventListener('DOMContentLoaded', event => {
      const params = (new URL(document.location)).searchParams;
      const searchInput = params.get('q');
      if(!searchInput)  else {
        const gallery = document.getElementById("gallery");
        const searchInfo = document.getElementById("search-info");
        gallery.innerHTML = "";

        searchInfo.innerHTML = `Searching for “${searchInput}”...`;
        pictureSearch(searchInput);
      }
    });

    document.getElementById("cart-link").innerHTML=`Cart`;
    if(cache.cartSize()!="")

	const form=document.querySelector('.search-form');
	form.addEventListener('submit',);

	//maybe implement comma search

    

	async function pictureSearch(searchInput) {
      const searchItems = searchInput.toString().split(' ');
      const pictureIds = await retrievePictures(searchItems);
      let response;
	  if(typeof(pictureIds)=='undefined'||pictureIds===null)else{
		for(let pictureId of pictureIds) {
          if(index < 100) {
			index++;

      let pic = cache.retrieve(pictureId);
			if (!pic) 

			/*
			if('caches' in window) {
       			 caches.open('cache_name').then((cache) => {
            		cache.add(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${pictureId}`,pictureId);
        		}).catch((err) => {
            
       			})
    		}*/
			

            let picture = document.createElement(`div`);
            

            picture.innerHTML = `<a href="./config.html?objectID=${pictureId}" id="object-${pictureId}">
          <img  src="${pic.image}" class="artwork" alt="" id="object-image-${pictureId}">
          <div class="museum-label">
            <span class="artist">${pic.artist}</span>
            <span class="title">${pic.title}</span>,
            <span class="date">${pic.date}</span>
          </div>
        </a>`;
            
            picture.className = "thumb";
            picture.addEventListener('click', );
      

            document.getElementById("gallery").appendChild(picture);
          }
        }
    }
    
      
		if(index===1)else{
			document.getElementById("search-info").innerHTML = `Found ${index} artworks for “${searchInput}”`;
    }
    document.getElementById("cart-link").innerHTML = `Count (${cache.countQuantity()})`;
    
    }
	
	async function retrievePictures(searchItems){
	    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
	    for (let item of searchItems) {
	      url += item + '+';
        }
		url = url.substring(0, url.length-1);
		const response = await fetch(url);
		
		const rawData = await response.json();
		const pictures= await rawData.objectIDs;
		
		return pictures;
  }
  
	/*function returnPictureArray(searchString){
		const array= document
	}*/
  