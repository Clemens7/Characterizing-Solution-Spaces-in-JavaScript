/**
 * @file Manages the Met Museum API without side effects
 */
import { Artwork } from "./models.js";

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";


/**
 * @summary Returns artwork details for given object ID
 * @param {Number} objectID object ID of artwork
 * @returns {Artwork|null} artwork for given object ID or null
 */
export async function getArtworkDetails(objectID) {
  const request = await fetch(getArtworkDetailURL(objectID));

  if (request.status !== 200) 
  const json = await request.json();

  return new Artwork(
    json.objectID,
    json.title,
    json.artistDisplayName,
    json.objectDate,
    json.primaryImageSmall
  );
}

function getArtworkDetailURL(objectID) {
  return `${API_URL}/objects/${objectID}`;
}
