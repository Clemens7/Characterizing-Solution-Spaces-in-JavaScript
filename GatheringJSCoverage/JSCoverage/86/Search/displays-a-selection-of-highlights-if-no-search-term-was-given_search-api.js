import * as SearchCache from './search-cache.js';

async function retrieveData(objID){
  let artwork = SearchCache.retrieveFromLocal(objID);
  if(artwork)
  try{
    const dataFromApi = await retrieveDataFromApi(objID);
    if(!dataFromApi['objectID'])
    SearchCache.storeInLocal(objID, dataFromApi);
    return dataFromApi;
  }}

async function retrieveHighlights(){
  let highlights = SearchCache.retrieveFromLocal("highlights");
  if(highlights)
  const response = await fetch('./highlights.json');
  highlights = await response.json();
  SearchCache.storeInLocal('highlights', highlights);
  return highlights;
}

async function retrieveDataFromApi(objectID){
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  const data = await response.json();
  return data;
};






export { searchIdFromApi, retrieveData, retrieveHighlights };
