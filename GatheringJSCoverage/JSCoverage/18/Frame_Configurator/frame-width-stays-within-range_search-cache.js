export function retrieve(pictureQuery) {
    if (pictureQuery in localStorage) 
}

export function store(pictureQuery, cachePictureObject) {
    console.log(`Storing ${pictureQuery} in local storage`);
    localStorage[pictureQuery] = JSON.stringify(cachePictureObject);
}