import * as SearchCache from './search-cache.js';

async function retrieveData(objID){
  let artwork = SearchCache.retrieveFromLocal(objID);
  if(artwork){
    return artwork;
  }}

async function retrieveHighlights(){
  let highlights = SearchCache.retrieveFromLocal("highlights");
  if(highlights){
    return highlights;
  }}

;






export { searchIdFromApi, retrieveData, retrieveHighlights };
