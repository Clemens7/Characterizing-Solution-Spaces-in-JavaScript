export function retrieve(objectID) {
    const key = getStorageKey(objectID)
    if (key in localStorage) 
}

export 

function getStorageKey(objectID) {
    return `MET-${objectID}`
}
