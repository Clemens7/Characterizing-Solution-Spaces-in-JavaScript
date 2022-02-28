const BASE_URL = 'https://collectionapi.metmuseum.org';

/**
 * Returns Artwork with ID id
 * caches Artworks
 * @param id = ID of Object
 * @returns Artwork with ID = id
 */
export async function getObject(id) {
  let artwork = JSON.parse(localStorage.getItem(id));
  if (!artwork) 
  return artwork;
}

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

export 

export 

export 
