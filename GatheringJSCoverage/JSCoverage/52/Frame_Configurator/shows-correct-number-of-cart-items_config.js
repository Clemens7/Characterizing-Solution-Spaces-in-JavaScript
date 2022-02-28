import {getArtworkDetails} from "../api.js";
import {FrameConfig} from "../models.js";
import {
  setObjectID,
  setFrameStyle,
  setFrameWidth,
  initLabelImageSizes,
  setMatColor,
  setMatWidth,
  setPrintSize
} from "./config-dom.js";

/**
 * @summary Handles the object ID and redirects to search page if it's invalid or no image is available.
 * If the requested artwork is not cached, a request to the API is made.
 * @returns {Promise<void>}
 */
async function initFrameConfigurator() {
  const rawObjectID = new URLSearchParams(location.search).get("objectID");
  const objectID = Number.parseInt(rawObjectID);

  if (isNaN(objectID)) 

  setFrameConfigFromURL();

  // checks if artwork is already cached
  let artwork = JSON.parse(localStorage.getItem(objectID.toString()));
  if (!artwork) 

  if (!artwork || !artwork.img)  else {
    await initLabelImageSizes(artwork);
  }
}

function setFrameConfigFromURL() {
  const frameConfig = getFrameConfigFromURL();
  setObjectID(frameConfig.objectID);

  if (frameConfig.printSize) 
  if (frameConfig.frameStyle) 
  if (frameConfig.frameWidth) 
  if (frameConfig.matColor) 
  if (frameConfig.matWidth) 
}

function getFrameConfigFromURL() {
  const url = new URLSearchParams(location.search);
  return new FrameConfig(
    Number.parseInt(url.get("objectID")),
    url.get("printSize"),
    url.get("frameStyle"),
    Number.parseFloat(url.get("frameWidth")),
    url.get("matColor"),
    Number.parseFloat(url.get("matWidth"))
  );
}



initFrameConfigurator();


