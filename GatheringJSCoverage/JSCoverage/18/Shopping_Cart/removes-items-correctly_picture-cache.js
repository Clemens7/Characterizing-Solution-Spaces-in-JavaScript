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
    if (cachedPicture === null ) {
      const temp = await fetch(API_URL);
      picture = await temp.json();
      window.localStorage.setItem(objectID, JSON.stringify(picture));

      // if the picture is in local storage already, parse it
    }
    return picture;
  }}
