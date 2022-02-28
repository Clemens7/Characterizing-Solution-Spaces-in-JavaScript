function node(element, elementClass, content, text, attributes) {
    const newElement = document.createElement(element);
    if(elementClass){
        newElement.className = elementClass;
    }
    for (let i in attributes){
        if(attributes[i][0] && attributes[i][1]){
            newElement.setAttribute(attributes[i][0], attributes[i][1]);
        }
    }
    if(content){
        if(text){
            newElement.innerText = content;
        } else {
            for (let entry of content){
                newElement.appendChild(entry);
            }
        }
    }

    return newElement;
}

export function createContainer(content = [], element = "div", elementClass = "", attributes = [[]]){
    return node(element, elementClass, content, false, attributes);
}

export function createTextNode(content = "", element = "span", elementClass = "", attributes = [[]]){
    return node(element, elementClass, content, true, attributes);
}

export function createArtworkLabel(artwork){
    if(!artwork) 
    const artist = createTextNode( artwork["artistDisplayName"], "span", "artist",);
    const title = createTextNode(artwork["title"] + ", ", "span", "title");
    const date = createTextNode(artwork["objectDate"], "span", "date");
    return createContainer([artist, title, date], "div", "museum-label");
}

export function createArtworkImage(artwork, index="0"){
    if(!artwork) 
    return createContainer("", "img", "",
        [ ["src", artwork["primaryImageSmall"]], ["alt", artwork["objectName"]], ["id", "object-image-" + index]] );
}