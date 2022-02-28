import * as SearchCache from './search-cache.js';





;




async function searchIdFromApi(searchterm){
  let objData;
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchterm}&hasImages=true`)
  const data = await response.json();
  return data;
}

export { searchIdFromApi, retrieveData, retrieveHighlights };
