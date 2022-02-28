export function retrieve(id) {
    if (id in localStorage) {
        console.log(`Retrieving ${id} from local storage`);
        return JSON.parse(localStorage[id]);
    }
}

export 