export 

export 

export function retrieveArtworks(searchTerm) {
  console.log(`Retrieving artworks from local storage with key: ${searchTerm}`);
  if (searchTerm in localStorage) {
    let arr = JSON.parse(localStorage[searchTerm]);
    return arr;
  }
}

export function retrieveNumberOfArtworks(searchTerm) {
  console.log(`Retrieving number of items from local storage with key: ${searchTerm}`);
  if (searchTerm in localStorage) {
    let arr = JSON.parse(localStorage[searchTerm]);
    return arr[1];
  }
}


export 