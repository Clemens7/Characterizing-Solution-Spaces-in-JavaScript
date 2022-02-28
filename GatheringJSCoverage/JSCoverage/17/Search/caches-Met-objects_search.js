import {search, getObject} from './common.js'

export async function init() {
    let searchParams = new URLSearchParams(window.location.search);
    try {
        await performSearch(searchParams.get('q'));
    } 
}

function setSearchQuery(q) {
    document.getElementById('search').setAttribute('value', q);
}

function addSearchResult(o) {
    let divThumb = document.createElement('div');
    divThumb.className = 'thumb';
    let a = document.createElement('a');
    a.id = `object-${o.objectID}`;
    a.href = `config.html?objectID=${encodeURIComponent(o.objectID)}`;
    divThumb.appendChild(a);

    let img = document.createElement('img');
    img.src = o.primaryImageSmall;
    img.alt = o.objectName;
    img.id = `object-image-${o.objectID}`;
    a.appendChild(img);

    let divLabel = document.createElement('div');
    divLabel.className = 'museum-label';
    divThumb.appendChild(divLabel);

    function addSpan(c, t) {
        let span = document.createElement('span');
        span.className = c;
        span.innerText = t;
        divLabel.appendChild(span)
    }

    addSpan('artist', o.artistDisplayName);
    addSpan('title', o.title);
    addSpan('date', `, ${o.objectDate}`);

    document.getElementById('gallery').appendChild(divThumb)
}

function updateSearchStatusMessage(t) {
    document.getElementById('search-info').innerText = t
}

async function performSearch(q) {
    let searchResult;
    if (q) {
        setSearchQuery(q);
        updateSearchStatusMessage(`Searching for “${q}”...`);
        try {
            searchResult = await search(q);
        } 
    }
    try {
        await Promise.all(searchResult.objectIDs.map(id => {
            return getObject(id).then(addSearchResult);
        }));
    } 
    if (q) {
        updateSearchStatusMessage(`Found ${searchResult.total} artwork${searchResult.total === 1  : 's'} for “${q}”`);
    }
}
