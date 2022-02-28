export function retrieve(objectID) {
    const key = getStorageKey(objectID)
    if (key in localStorage) 
}

export function store(objectID, met) {
    const key = getStorageKey(objectID)
    localStorage[key] = JSON.stringify(met)
}

function getStorageKey(objectID) {
    return `MET-${objectID}`
}
