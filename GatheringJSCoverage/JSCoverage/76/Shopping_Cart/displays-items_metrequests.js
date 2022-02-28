const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

export function retrieve(id) {
    console.log("retrieving " + id);
    let response = JSON.parse(localStorage.getItem("" + id));
    if (response !== null) 
    else return fetch(MET_BASE_URL + id)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem(id, JSON.stringify(data));
            return data;
        });
}