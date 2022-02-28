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
    {   
         await fetch('./highlights.json')	
		.then(response	=>	response.json())	
        .then(data	=> ids =data.highlights);
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
            
        }
    }

    PictureCache.store(searchString, objects);
    return objects;
    
}

