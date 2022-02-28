









async function fetchObject(objectId) {
    const cachedObject = await localStorage.getItem(objectId.toString());
    if (cachedObject) {
        return JSON.parse(cachedObject);
    }}








export { performSearch, getObjectURL, getArtistName, fetchObject}
