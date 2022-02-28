export function retrieve(pictureQuery) {
    if (pictureQuery in localStorage) {
        console.log(`Retrieving ${pictureQuery} from local storage`);
        return JSON.parse(localStorage[pictureQuery]);
    }
}

export 