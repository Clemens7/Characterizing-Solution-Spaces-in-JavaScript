
	 
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
      if(!searchInput) {
        loadHighlights();
        return;
      }
    });

    document.getElementById("cart-link").innerHTML=`Cart`;
    if(cache.cartSize()!="")

	const form=document.querySelector('.search-form');
	form.addEventListener('submit',);

	//maybe implement comma search

    async function loadHighlights() {
      //const h=  [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];

      const h = await fetch('highlights.json');
	  const g=await h.json();
	  const f= g.highlights;

      for (let pictureId of f) {
		const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${pictureId}`);
        const rawData = await response.json();
        let picture = document.createElement(`div`);
        picture.innerHTML = `<a href="./config.html?objectID=${pictureId}" id="object-${rawData.objectID}">
			 	<img src="${rawData.primaryImageSmall}" alt="" id="object-image-${rawData.objectID}">
			 	<div class="museum-label">
			 		<span class="artist">${rawData.artistDisplayName}</span>
			 		<span class="title">${rawData.title}</span>,
					<span class="date">${rawData.objectDate}</span>
			 	</div>
			 	</a>`;
        picture.className = "thumb";
        document.getElementById("gallery").appendChild(picture);
      }
    }

	
	
	
  
	/*function returnPictureArray(searchString){
		const array= document
	}*/
  