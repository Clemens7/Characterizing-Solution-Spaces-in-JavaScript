const met_url = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function getObject(objectID){
    let object = JSON.parse(localStorage.getItem(objectID));
    if(!object)
    return object;
}

