export function retrieve(objectID) {
    const key = getStorageKey(objectID)
    if (key in localStorage) {
        console.log(`Retrieve chached value for ObjectID: ${objectID}`)
        return JSON.parse(localStorage[key])
    }
}

export 

function getStorageKey(objectID) {
    return `MET-${objectID}`
}
