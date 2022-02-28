const met_url = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function getObject(objectID){
    let object = JSON.parse(localStorage.getItem(objectID));
    if(!object){
        const newUrl = met_url + 'objects/' + objectID;
        object = await fetch(newUrl).then(data => data.json());
        if(!object || object.objectID == null)
        localStorage.setItem(object.objectID, JSON.stringify(object));
    }
    return object;
}

