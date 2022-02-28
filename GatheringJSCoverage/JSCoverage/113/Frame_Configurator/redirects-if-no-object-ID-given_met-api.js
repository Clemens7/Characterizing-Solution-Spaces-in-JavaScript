import * as MetCache from './met-cache.js';
import { ImageObject } from './met.js';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const search = 

export const fetchObjectData = async (id) => {
  const url = `${BASE_URL}/objects/${id}`;

  let image = MetCache.fetchImage(id);
  if(image)

  try {
    const data = await fetch(url).then().catch();