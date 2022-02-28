const API_BASE = 'https://collectionapi.metmuseum.org';

export 

export async function searchObjects(q) {
    const endpoint = `/public/collection/v1/search?hasImages=true&q=${encodeURI(q)}`;
    let res = await fetch(API_BASE + endpoint).then(function (data) {
        return data.json();
    });
    if (!res || res.total === 0) {
        res = { total: 0, objectIDs: [] };
    }
    return res;
}