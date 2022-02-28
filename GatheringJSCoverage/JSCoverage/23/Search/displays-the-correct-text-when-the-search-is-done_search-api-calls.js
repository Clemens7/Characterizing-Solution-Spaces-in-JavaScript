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



export 

export 
