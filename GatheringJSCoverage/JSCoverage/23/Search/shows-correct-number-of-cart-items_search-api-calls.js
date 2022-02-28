import { GalleryItem } from "./search-objects.js";
import * as SearchObjectsCache from "./search-objects-cache.js";

export 

export async function getHighlights() {
  let highlightsIds = await getHighlightIds();
  return getGalleryItems(highlightsIds);
}

async function getHighlightIds() {
  const response = await fetch("highlights.json");
  const jsonHighlightsData = await response.json();
  return jsonHighlightsData.highlights;
}

export async function getGalleryItemFromObjectId(objectID) {
  let galleryItem = SearchObjectsCache.retrieve(objectID);
  if (galleryItem) {
    return galleryItem;
  }}

export async function getGalleryItems(retrievedObjects) {
  let promises = [];
  for (
    var i = 0;
    i < (retrievedObjects.length > 100  : retrievedObjects.length);
    i++
  ) {
    promises.push(getGalleryItemFromObjectId(retrievedObjects[i]));
    console.log(promises[i]);
  }
  console.log(promises);
  return Promise.all(promises);
}
