import { store, retrieveFromStorage } from './art-cache.js';
import { retrieveIDsFromAPI, retriveImagesFromAPI } from './art-api.js';
import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';

export async function searchForSomeArt(queryElems) {
    const storeImageAndTotal = retrieveFromStorage(queryElems);
    if (storeImageAndTotal)  else {

      const first100IDsandTotalNumber = await retrieveIDsFromAPI(queryElems);
      const first100IDs = first100IDsandTotalNumber[0];
      const totalNumber = first100IDsandTotalNumber[1];
      const first100Images = await retriveImagesFromAPI(first100IDs, first100IDs.length);
      

      store(queryElems, [first100Images, totalNumber]);
      for(let i = 0; i < first100Images.length; i++)
      addStuffToHtml(first100Images);

      let headerDoc = document.getElementById('search-info');
      if (totalNumber == 1)  else if (totalNumber > 1)  else if (queryElems == "null") {
        headerDoc.innerText = `Found 0 artworks for “null”`;
      }
    }
  }
  
  export 
