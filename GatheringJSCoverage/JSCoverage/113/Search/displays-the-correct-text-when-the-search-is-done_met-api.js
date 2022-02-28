import * as MetCache from './met-cache.js';
import { ImageObject } from './met.js';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const search = async (term) => {
  const url = `${BASE_URL}/search?hasImages=true&q=${term}`;
  try {
    const repsonse = await fetch(url);
    const data = await repsonse.json();
    return data.objectIDs || [];
  }}

export const fetchObjectData = 