import { GalleryItem } from "./search-objects.js";
import * as SearchObjectsCache from "./search-objects-cache.js";

export async function getObjectIds(searchString) {
  const haveImages = "hasImages=true";
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchString}&${haveImages}`
  );
  console.log("getting ");
  const rawData = await response.json();
  return rawData.objectIDs;
}

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

export async function getGalleryItems(retrievedObjects) {
  let promises = [];
  for (
    var i = 0;
    i < (retrievedObjects.length > 100 ? 100 );
    i++
  ) {
    promises.push(getGalleryItemFromObjectId(retrievedObjects[i]));
    console.log(promises[i]);
  }
  console.log(promises);
  return Promise.all(promises);
}
