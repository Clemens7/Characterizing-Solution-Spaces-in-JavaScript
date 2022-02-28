import { store, retrieveFromStorage } from './art-cache.js';
import { retrieveIDsFromAPI, retriveImagesFromAPI } from './art-api.js';
import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';

export 
  
  export async function displayhighlights() {
    const storeImageAndTotal = retrieveFromStorage(["“This key is reserved for highlights”"]);
    if (storeImageAndTotal)  else {
      const highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
      let highlightImages = await retriveImagesFromAPI(highlights, highlights.length);
      store(["“This key is reserved for highlights”"], [highlightImages, highlights.length]);
      console.log(highlightImages);
      for(let i = 0; i < highlightImages.length; i++){
        localStorage.setItem(highlightImages[i].objectID, JSON.stringify(highlightImages[i]));
      }
      addStuffToHtml(highlightImages);
    }
  }
