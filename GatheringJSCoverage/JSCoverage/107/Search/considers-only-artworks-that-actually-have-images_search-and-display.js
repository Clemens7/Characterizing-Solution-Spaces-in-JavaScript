import { store, retrieveFromStorage } from './art-cache.js';
import { retrieveIDsFromAPI, retriveImagesFromAPI } from './art-api.js';
import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';

export async function searchForSomeArt(queryElems) {
    const storeImageAndTotal = retrieveFromStorage(queryElems);
    if (storeImageAndTotal)  else {

      const first100IDsandTotalNumber = await retrieveIDsFromAPI(queryElems);
    }}
  
  export 
