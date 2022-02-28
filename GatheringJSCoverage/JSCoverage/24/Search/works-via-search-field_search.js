import * as api from './artworkApi.js';

function renderResults(resultObject) {
    if(Array.isArray(resultObject)){
        resultObject.forEach(function (elementID) {
            api.loadObject(elementID).then(function (element) {
                addResult(element);
            });
        });
    }
}

function addResult(element) {
    const template = document.createElement("div");
    template.classList.add("thumb");
    const a = document.createElement('a');
    a.href = `config.html?objectID=${element.objectID}`;
    a.id = `object-${element.objectID}`;
    const img = document.createElement("img");
    img.alt = element.title;
    img.id = `object-image-${element.objectID}`;
    img.src = element.primaryImageSmall;
    const div = document.createElement("div");
    div.classList.add("museum-label");
    const span_artist = document.createElement("span");
    span_artist.classList.add("artist");
    span_artist.innerHTML = element.artistDisplayName;
    const span_title = document.createElement("span");
    span_title.classList.add("title");
    span_title.innerHTML = element.title;
    const comma = document.createTextNode(', ');
    const span_date = document.createElement("span");
    span_date.classList.add("date");
    span_date.innerHTML = element.objectDate;

    div.appendChild(span_artist);
    div.appendChild(span_title);
    div.appendChild(comma);
    div.appendChild(span_date);
    a.appendChild(img);
    a.appendChild(div);
    template.appendChild(a);

    document.getElementById("gallery").appendChild(template);
}

export {api, renderResults, addResult};