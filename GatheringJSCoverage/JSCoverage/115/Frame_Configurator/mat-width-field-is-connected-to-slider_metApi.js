export const metAPI = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function loadObject(id, API) {
  if (localStorage.getItem(id)) 
  try {
    let res = await fetch(API + '/objects/' + id);
    let data = await res.json();
    localStorage.setItem(id, JSON.stringify(data));
    return data;
  }