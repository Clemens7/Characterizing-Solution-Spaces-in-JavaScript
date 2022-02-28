import { GalleryItem } from "./search-objects.js";
import * as SearchObjectsCache from "./search-objects-cache.js";

export 

export 



export async function getGalleryItemFromObjectId(objectID) {
  let galleryItem = SearchObjectsCache.retrieve(objectID);
  if (galleryItem) {
    return galleryItem;
  }}

export 
