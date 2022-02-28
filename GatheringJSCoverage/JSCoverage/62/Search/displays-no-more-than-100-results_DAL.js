import * as PictureCache from './pictureCache.js'


export 

export async function getPictures(searchString)
{
    
    const API_OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    const API_SEARCH_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&`;

    var erg = PictureCache.retrieve(searchString);
    var objects = [];
    if(erg)
    

    var ids;
    if(searchString == "highlights")
    
    else{
        await fetch(API_SEARCH_URL+'q='+ searchString)	
		.then(response	=>	response.json())	
        .then(data	=> ids =data.objectIDs);
    }
    var count =0;
    if(!ids)
    
    for(var id of ids)
    {
        console.log(id);
        try{
            const response= await fetch(API_OBJECT_URL + id);
            const rawData = await response.json();
            objects.push(rawData);
            count++;
            if(count == 100)
            {
                    break;
            }
        }
    }

    PictureCache.store(searchString, objects);
    return objects;
    
}

