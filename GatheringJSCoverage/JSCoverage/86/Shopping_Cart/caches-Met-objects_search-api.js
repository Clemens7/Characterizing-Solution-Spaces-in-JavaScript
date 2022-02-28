import * as SearchCache from './search-cache.js';

async function retrieveData(objID){
  let artwork = SearchCache.retrieveFromLocal(objID);
  if(artwork){
    return artwork;
  }}



;






export { searchIdFromApi, retrieveData, retrieveHighlights };
