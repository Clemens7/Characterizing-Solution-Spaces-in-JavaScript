export function retrieve(searchTerm) {
    if (searchTerm in localStorage){
        console.log(`Retrieving ${searchTerm} from local storage`);
        return JSON.parse(localStorage[searchTerm]);
    }
}

export 
