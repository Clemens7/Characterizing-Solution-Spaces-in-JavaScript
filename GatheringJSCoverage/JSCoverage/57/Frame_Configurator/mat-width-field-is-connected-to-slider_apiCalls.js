export const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

export const getArtById = async objectID => {
    const response = await fetch(MET_BASE_URL + `objects/${objectID}`)
    const artJson = await response.json()
    return artJson;
}

export const searchArt = 