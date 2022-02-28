import {search, getObject} from './common.js'

export async function init() {
    let searchParams = new URLSearchParams(window.location.search);
    try {
        await performSearch(searchParams.get('q'));}







async function performSearch(q) {
    let searchResult;
    if (q)  else {
        let response = await fetch('highlights.json');
        if (response.status !== 200) 
        let result = await response.json();
        searchResult = {
            total: result.highlights.length,
            objectIDs: result.highlights,
        }
    }
    try {
        await Promise.all(searchResult.objectIDs.map(id => {
            return getObject(id).then(addSearchResult);
        }));}
