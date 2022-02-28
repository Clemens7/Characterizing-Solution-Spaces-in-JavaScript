
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

  if(!objId)

  if(parseInt(objId.length) > 100){
    objId = objId.slice(0, 100);
    console.log(objId.length);
  }

  await loadAllThenDisplay(objId);
  //await displayWhileLoading(objId);
  displayText.innerHTML =  `Found ${objIdFromSearch['total']} ${objId.length == 1  : "artworks"} for “${searchTerm}” `
}


function loadAllThenDisplay(objId){
  var promises = objId.map(id => SearchAPI.retrieveData(id).then(result => createItem(result)));
  return Promise.all(promises)
  .then(newItems => {
    for(var newItem of newItems){
      container.appendChild(newItem);
    }
  })
}



