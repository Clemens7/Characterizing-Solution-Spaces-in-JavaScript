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


export function generateCartItem(index, cartObjectData, configParams, container) {
    const id = cartObjectData.objectID;
    let cartTotal = document.getElementsByClassName('cart-total')[0];

    let itemNode = document.createElement("div");
    itemNode.className = "cart-item";

    let previewNode = document.createElement("div");
    previewNode.className = "cart-preview";
    previewNode.setAttribute("id", `preview-container-${index}`);

    let linkNode = document.createElement("a");
    linkNode.setAttribute("href", `config.html?objectID=${id}&frameWidth=${configParams.frameWidth}&frameStyle=${configParams.frameStyle}&printSize=${configParams.printSize}&matColor=${configParams.matColor}&matWidth=${configParams.matWidth}`);

    previewNode.appendChild(linkNode);

    const img = cartObjectData.primaryImageSmall;

    let imgNode = document.createElement("img");
    imgNode.className = "cart-thumb";
    imgNode.onload = function () {
        Frame.render(this, previewNode, configParams.printSize, configParams.frameStyle, configParams.frameWidth, configParams.matColor, configParams.matWidth);
        linkNode.appendChild(this);
    };
    imgNode.setAttribute("src", img);
    imgNode.setAttribute("id", `preview-${index}`);
    imgNode.setAttribute("alt", cartObjectData.title);


    let labelNode = document.createElement("div");
    labelNode.className = "museum-label";
    generateArtLabel(cartObjectData, labelNode.appendChild(document.createElement('div')));

    let size = {
        S: 'Small',
        M: 'Medium',
        L: 'Large'
    };
    let matText = configParams.matWidth == 0  : ` with a ${configParams.matWidth/10} cm ${configParams.matColor} mat`
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "frame-description";
    descriptionSpan.innerText = `${size[configParams.printSize]} print in a ${configParams.frameWidth/10} cm ${configParams.frameStyle} frame${matText}.`
    labelNode.firstChild.appendChild(document.createElement("br"));
    labelNode.firstChild.appendChild(document.createElement("br"));
    labelNode.firstChild.appendChild(descriptionSpan);

    let itemPriceNode = document.createElement("div");
    itemPriceNode.innerText = "€ ";

    let priceSpan = document.createElement("span");
    priceSpan.setAttribute("id", `price-${index}`);
    priceSpan.innerText = Frame.calculatePrice(configParams.printSize, configParams.frameStyle, configParams.frameWidth, configParams.matWidth).toFixed(2);

    itemPriceNode.appendChild(priceSpan);

    let removeButton = document.createElement("button");
    removeButton.className = "cart-remove";

    labelNode.appendChild(itemPriceNode);
    labelNode.appendChild(removeButton);

    itemNode.appendChild(previewNode);
    itemNode.appendChild(labelNode);

    // container.insertBefore(itemNode, cartTotal);
    container.appendChild(itemNode);

    return itemNode;

}



export 
