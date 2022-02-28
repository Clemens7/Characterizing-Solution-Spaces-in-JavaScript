export const metAPI = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function loadObject(id, API) {
  if (localStorage.getItem(id)) return JSON.parse(localStorage.getItem(id));