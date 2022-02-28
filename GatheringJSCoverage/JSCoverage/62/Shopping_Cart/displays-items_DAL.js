import * as PictureCache from './pictureCache.js'


export async function getPicture(id)
{
    const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    var object_url = BASE_URL + id;

    // Return ojb if request already in cache
    let obj = PictureCache.retrieve(object_url);
    if (obj) 

    try{
        await fetch(object_url)
        .then(response => response.json())
        .then(data => obj = data)
        // Cache request
        PictureCache.store(object_url, obj);

        return obj;
    }}

export 

