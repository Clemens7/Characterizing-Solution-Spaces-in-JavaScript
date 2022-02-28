const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export 

export async function findObject(id) {
    let url = MET_BASE + "/objects/" + id;

    let obj = JSON.parse(localStorage.getItem(id)); // check if cached
 
    if(obj == null) // if not fetch
    

    return obj;
}


export async function findByQuery(query) {
    const searchURL = MET_BASE + '/search?hasImages=true&q=' + encodeURI(query); //has Images request, objects that match query+have images
    let result = await fetch(searchURL).then(data => data.json());
    if (!result || result.total === 0) 
    return result;
}


