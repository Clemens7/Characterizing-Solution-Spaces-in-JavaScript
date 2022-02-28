
//////////// +++ ARTWORK +++ ///////////////
export class Artwork {
    
}


/////////// +++ RETRIEVE +++ //////////////////
export async function retrieve(q) {

    if (q in localStorage) 
    let artworks = [];
    let objectCount = 100;


    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}`;


    try {
        const response = await fetch(url);}



/////////// +++ DISPLAY +++ //////////////////

export 


/////////// +++ LOAD HIGHLIGHTS +++ //////////////////

export 
