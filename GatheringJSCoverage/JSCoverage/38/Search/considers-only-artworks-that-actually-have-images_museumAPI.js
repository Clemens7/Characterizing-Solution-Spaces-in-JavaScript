
export 


export async function search(query){
    let results;
    let term = escape(query);
    console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${term}`);
    await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${term}`)
        .then()
        .then()
        .catch();