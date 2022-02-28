export function retrieve(objectID) {
    const art = localStorage.getItem(objectID);
    if (art) {
        console.log(`Retrieved ${objectID} from local storage`);
        return JSON.parse(art);
    }
}

export 
