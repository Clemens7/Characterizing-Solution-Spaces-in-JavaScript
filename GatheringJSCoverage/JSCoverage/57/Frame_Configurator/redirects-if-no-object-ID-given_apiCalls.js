export const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

export const getArtById = async objectID => {
    const response = await fetch(MET_BASE_URL + `objects/${objectID}`)}

export const searchArt = async q => {
    const response = await fetch(MET_BASE_URL + `search?q=${q}&hasImages=true`)
    const searchResults = await response.json()
    console.log('searchResults', searchResults);
    return searchResults;
}