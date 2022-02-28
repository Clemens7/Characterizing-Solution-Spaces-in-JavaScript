import * as MetCache from './met-cache.js';
import { ImageObject } from './met.js';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const search = 

export const fetchObjectData = async (id) => {
  const url = `${BASE_URL}/objects/${id}`;

  let image = MetCache.fetchImage(id);
  if(image){
    return image;
  }

  try {
    const data = await fetch(url).then((response)=>{
      console.log(`received response ${response.ok}`)
      if(response.ok) {
        return response.json();
      }
    }).catch();
    if(!data) 
    // const data = await repsonse.json();
    const img = new ImageObject(data.objectID, data.primaryImageSmall, data.artistDisplayName, data.title, data.objectDate);
    MetCache.storeImage(img);
    return img;
  }