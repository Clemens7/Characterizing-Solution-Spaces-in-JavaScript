const API_BASE = 'https://collectionapi.metmuseum.org';

export async function loadObject(objId) {
    let obj = JSON.parse(localStorage.getItem(objId));
    if(obj) 

    obj = await fetch(`${API_BASE}/public/collection/v1/objects/${objId}`).then(res => res.json());
    if(!obj || !obj.objectID) 
    localStorage.setItem(objId, JSON.stringify(obj));
    return obj;
}

export async function searchObjects(q) {
    const endpoint = `/public/collection/v1/search?hasImages=true&q=${encodeURI(q)}`;
    let res = await fetch(API_BASE + endpoint).then(function (data) {
        return data.json();
    });
    if (!res || res.total === 0) 
    return res;
}