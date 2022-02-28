import { store, retrieveFromStorage } from './art-cache.js';
import { retrieveIDsFromAPI, retriveImagesFromAPI } from './art-api.js';
import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';

export async function searchForSomeArt(queryElems) {
    const storeImageAndTotal = retrieveFromStorage(queryElems);
    if (storeImageAndTotal) {
      addStuffToHtml(storeImageAndTotal[0]);

      let headerDoc = document.getElementById('search-info');
      if (storeImageAndTotal[1] == 1)  else if (storeImageAndTotal[1] > 1) {
        headerDoc.innerText = `Found ${storeImageAndTotal[1]} artworks for “${queryElems.join(' ')}”`;
      }
    }
  }
  
  export 
