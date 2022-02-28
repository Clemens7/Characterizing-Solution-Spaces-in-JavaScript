import * as PictureCache from './pictureCache.js'


export 

export async function getPictures(searchString)
{
    
    const API_OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    const API_SEARCH_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&`;

    var erg = PictureCache.retrieve(searchString);
    var objects = [];
    if(erg)
    {
        return erg;
    }}

