export 

export 

export function retrieveArtworks(searchTerm) {
  console.log(`Retrieving artworks from local storage with key: ${searchTerm}`);
  if (searchTerm in localStorage) {
    let arr = JSON.parse(localStorage[searchTerm]);
    return arr;
  }
}

export 


export 