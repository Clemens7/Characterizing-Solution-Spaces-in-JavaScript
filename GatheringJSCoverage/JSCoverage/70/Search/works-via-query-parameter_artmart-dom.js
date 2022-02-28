import * as Frame from './frame.js';
import * as Cache from './cache.js';

/**
 * Generates the thumbnail with label for the given art-object and appends it to the container
 * @param object    The Metropolitan Museum of Art Collection API object for which to generate the thumbnail for
 * @param container The parent (DOM) element to append the generated thumbnail to. Must not be null.
 * */
export function generateThumbnail(object, container) {
    let id = object.objectID;
    let thumbNode = document.createElement("div");
    thumbNode.className = "thumb";

    let linkNode = document.createElement("a");
    linkNode.setAttribute("href", `config.html?objectID=${id}`);
    linkNode.setAttribute("id", `object-${id}`);
    thumbNode.appendChild(linkNode);

    let imgNode = document.createElement("img");
    imgNode.setAttribute("src", object.primaryImageSmall)
    imgNode.setAttribute("id", `object-image-${id}`);
    imgNode.setAttribute("alt", object.title)
    linkNode.appendChild(imgNode);

    let museumNode = document.createElement("div");
    museumNode.className = "museum-label";
    linkNode.appendChild(museumNode);

    generateArtLabel(object, museumNode);

    container.appendChild(thumbNode);
}

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
