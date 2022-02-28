
export async function requestById(id){
    let artObject;
    await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        .then(response => response.json())
        .then(data => artObject = data)
        .catch();
    return artObject;
}


export 