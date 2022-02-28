export function retrieve(objectId) {
  if (objectId in localStorage) 
}

export function store(galleryItem) {
  console.log(`Storing ${galleryItem.objectID} in local storage`);
  localStorage[galleryItem.objectID] = JSON.stringify(galleryItem);
}
