import { searchMET, getObject } from "./metropolitan-api.js";
//import * as highlightsJson from "./highlights.json";
initSearch();
function initSearch() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("q") ) 
    else {
        fetch('highlights.json')
            .then(res => res.json())
            .then((data) => {
            var promises = [];
            data.highlights.forEach(id => {
                promises.push(getObject(id));
            });
            Promise.all(promises).then(foundObjects => {
                addImages(foundObjects);
            });
        })
            .catch();
    }
}


function addImages(objects) {
    let gallery = document.getElementById("gallery");
    for (let i = 0; i < objects.length; i++) {
        //div
        let divElement = createHTMLElement("div", "thumb");
        //a
        let linkElement = createHTMLElement("a", undefined, undefined, `object-${i}`);
        linkElement.href = `/config.html?objectID=${objects[i].objectID}`;
        //img
        let imgElement = createHTMLElement("img", undefined, undefined, `object-image-${i}`);
        imgElement.src = objects[i].image;
        imgElement.alt = objects[i].title;
        //div
        let labelDiv = createHTMLElement("div", "museum-label");
        //spans
        let artist = createHTMLElement("span", "artist", objects[i].artist);
        let title = createHTMLElement("span", "title", objects[i].title + ", ");
        let date = createHTMLElement("span", "date", objects[i].date);
        labelDiv.appendChild(artist);
        labelDiv.appendChild(title);
        labelDiv.appendChild(date);
        linkElement.appendChild(imgElement);
        linkElement.appendChild(labelDiv);
        divElement.appendChild(linkElement);
        gallery.appendChild(divElement);
    }
}
function createHTMLElement(elementName, className, inputText, id) {
    let element = document.createElement(elementName);
    if (className)
        element.className = className;
    if (id)
        element.id = id;
    if (inputText && inputText != null)
        element.innerText = inputText;
    return element;
}
