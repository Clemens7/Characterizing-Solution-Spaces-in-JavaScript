const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export 

export async function findObject(id) {
    let url = MET_BASE + "/objects/" + id;

    let obj = JSON.parse(localStorage.getItem(id)); // check if cached
 
    if(obj == null) // if not fetch
    {
        obj = await fetch(url).then(handleErrors).then( response =>  response.json());}


export 

function handleErrors(response) {
    if (!response.ok) 
    return response;
}
