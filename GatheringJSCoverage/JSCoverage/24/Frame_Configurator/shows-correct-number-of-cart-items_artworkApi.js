const API_BASE = 'https://collectionapi.metmuseum.org';

export async function loadObject(objId) {
    let obj = JSON.parse(localStorage.getItem(objId));
    if(obj) {
        return obj;
    }) }

export 