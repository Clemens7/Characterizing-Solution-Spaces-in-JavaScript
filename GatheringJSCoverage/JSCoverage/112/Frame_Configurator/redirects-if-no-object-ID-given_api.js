const BASE_URL = 'https://collectionapi.metmuseum.org';

/**
 * Returns Artwork with ID id
 * caches Artworks
 * @param id = ID of Object
 * @returns Artwork with ID = id
 */
export async function getObject(id) {
  let artwork = JSON.parse(localStorage.getItem(id));
  if (!artwork) {
    const response = await object(id);
    if (response.status === 400 || response.status === 404) 
    artwork = await response.json();}

/**
 * Returns array of artworkIDs to query q
 * @param q = search query
 * @returns [] of ids
 */
export 

/**
 * Returns highlights ids of artworks
 * @returns [] of ids
 */
export async function highlights(){
  const idObject= await fetch('highlights.json').then(ids => ids.json());
  return idObject.highlights;
}

export async function object(objectID) {
  return fetch(`${BASE_URL}/public/collection/v1/objects/${objectID}`);
}

export 

export 
