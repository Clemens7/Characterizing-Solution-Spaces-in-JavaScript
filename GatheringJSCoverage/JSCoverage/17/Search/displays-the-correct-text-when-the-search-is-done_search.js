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
        await Promise.all(searchResult.objectIDs.map());
    } 
    if (q) {
        updateSearchStatusMessage(`Found ${searchResult.total} artwork${searchResult.total === 1  : 's'} for “${q}”`);
    }
}
