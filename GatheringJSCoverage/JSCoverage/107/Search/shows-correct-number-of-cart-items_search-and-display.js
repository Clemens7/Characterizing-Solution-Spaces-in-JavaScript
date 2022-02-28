import { store, retrieveFromStorage } from './art-cache.js';
import { retrieveIDsFromAPI, retriveImagesFromAPI } from './art-api.js';
import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';

export 
  
  export async function displayhighlights() {
    const storeImageAndTotal = retrieveFromStorage(["“This key is reserved for highlights”"]);
    if (storeImageAndTotal) {
      addStuffToHtml(storeImageAndTotal[0]);
    }
  }
