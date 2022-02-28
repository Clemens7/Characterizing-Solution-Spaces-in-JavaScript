export 

  export async function retrieveIDsFromAPI(queryElems) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${queryElems.join(' ')}`;

    try {
      const response = await fetch(url);