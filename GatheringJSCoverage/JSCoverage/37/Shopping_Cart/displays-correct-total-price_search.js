









async function fetchObject(objectId) {
    const cachedObject = await localStorage.getItem(objectId.toString());
    if (cachedObject) 

    const url = new URL(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    return await fetch(url)
    .then(response => response.json())
    .then(response => {
        localStorage.setItem(objectId.toString(), JSON.stringify(response));
        return response;
    })
}








export { performSearch, getObjectURL, getArtistName, fetchObject}
