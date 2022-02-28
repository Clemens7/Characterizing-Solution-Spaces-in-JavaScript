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



async function retrieveDataFromApi(objectID){
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  const data = await response.json();
  return data;
};




async function searchIdFromApi(searchterm){
  let objData;
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchterm}&hasImages=true`)
  const data = await response.json();
  return data;
}

export { searchIdFromApi, retrieveData, retrieveHighlights };
