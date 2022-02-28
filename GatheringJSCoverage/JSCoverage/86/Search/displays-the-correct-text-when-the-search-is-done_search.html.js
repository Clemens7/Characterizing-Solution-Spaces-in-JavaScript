
import { createItem } from './search-dom.js' ;
import * as SearchAPI from './search-api.js' ;
import * as SearchCache from './search-cache.js' ;

const container = document.getElementById('gallery');
const displayText = document.getElementById('search-info');

document.addEventListener('DOMContentLoaded',function(){
  SearchCache.cartCache();

  const params = (new URL(document.location)).searchParams;
  const searchQuery = params.get('q');
  if(!searchQuery);
  gallerySearch(searchQuery);
});





async function gallerySearch(searchTerm){
  displayText.innerHTML = `Searching for “${searchTerm}”...`;
  const objIdFromSearch = await SearchAPI.searchIdFromApi(searchTerm);
  let objId = await objIdFromSearch['objectIDs'];

  if(!objId){
    displayText.innerHTML = `Found 0 artworks for “${searchTerm}”`
    return;
  }} for “${searchTerm}” `
}






