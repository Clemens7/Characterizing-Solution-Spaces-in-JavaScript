import * as Frame from './frame.js';
import * as Cache from './cache.js';

/**
 * Generates the thumbnail with label for the given art-object and appends it to the container
 * @param object    The Metropolitan Museum of Art Collection API object for which to generate the thumbnail for
 * @param container The parent (DOM) element to append the generated thumbnail to. Must not be null.
 * */
export 

/**
 *  Generates the label for the given art-object and appends it to the container 
 * @param object    The Metropolitan Museum of Art Collection API object for which to generate the label for
 * @param container The parent (DOM) element to append the generated label to. Must not be null.
 * */
export function generateArtLabel(object, container) {
    let artistsNode = document.createElement("span");
    artistsNode.className = "artist";
    artistsNode.innerHTML = object.artistDisplayName;
    container.appendChild(artistsNode);

    let titleNode = document.createElement("span");
    titleNode.className = "title"
    titleNode.innerHTML = object.title + ", ";
    container.appendChild(titleNode);

    let dateNode = document.createElement("span");
    dateNode.className = "date";
    dateNode.innerHTML = object.objectDate;
    container.appendChild(dateNode);
}


export 



export 
