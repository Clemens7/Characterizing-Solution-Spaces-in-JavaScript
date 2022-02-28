
import { createItem } from './search-dom.js' ;
import * as SearchAPI from './search-api.js' ;
import * as SearchCache from './search-cache.js' ;

const container = document.getElementById('gallery');
const displayText = document.getElementById('search-info');

document.addEventListener('DOMContentLoaded',function(){
  SearchCache.cartCache();

  const params = (new URL(document.location)).searchParams;
  const searchQuery = params.get('q');
  if(!searchQuery){
    showHighlights();
    return;
  }});


async function showHighlights(){
  const highlights = await SearchAPI.retrieveHighlights();
  loadAllThenDisplay(highlights['highlights']);
  //displayWhileLoading(highlights['highlights']);
}





function loadAllThenDisplay(objId){
  var promises = objId.map(id => SearchAPI.retrieveData(id).then());
  return Promise.all(promises)
  .then()
}



