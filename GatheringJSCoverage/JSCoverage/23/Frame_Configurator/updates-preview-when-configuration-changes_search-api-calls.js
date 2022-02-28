import { GalleryItem } from "./search-objects.js";
import * as SearchObjectsCache from "./search-objects-cache.js";

export 

export 



export async function getGalleryItemFromObjectId(objectID) {
  let galleryItem = SearchObjectsCache.retrieve(objectID);
  if (galleryItem) 

  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  const rawData = await response.json();
  galleryItem = new GalleryItem(
    rawData.objectID,
    rawData.title,
    rawData.artistDisplayName,
    rawData.primaryImageSmall,
    rawData.objectDate
  );
  SearchObjectsCache.store(galleryItem);
  return galleryItem;
}

export 
