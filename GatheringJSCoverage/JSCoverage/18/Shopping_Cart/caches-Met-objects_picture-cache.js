/**
 * Retrieves picture object from local storage or from museum api
 * @param {string} objectID - id of the picture to retrieve
 */
export default async function retrievePicture(objectID) {
  if (objectID) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    const cachedPicture = window.localStorage.getItem(objectID);
    let picture;

    // if the picture is not in local storage, retrieve it from api and
    // cache it in loca storage
    if (cachedPicture === null || cachedPicture === undefined)  else {
      picture = JSON.parse(cachedPicture);
    }
    return picture;
  }}
