const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export 

export 


export async function findByQuery(query) {
    const searchURL = MET_BASE + '/search?hasImages=true&q=' + encodeURI(query); //has Images request, objects that match query+have images
    let result = await fetch(searchURL).then();) }


