export function store(searchTerm, artworks, numberOfItems) {
  console.log(`store: ${JSON.stringify(artworks)}`);
  let arr = [artworks, numberOfItems];
  localStorage.setItem(searchTerm, JSON.stringify(arr));
  for (let artwork of artworks) {
    console.log(`Storing artwork witch objectID: ${artwork.objectID}`);
    localStorage.setItem(artwork.objectID, JSON.stringify(artwork));
  }
}

export 

export function retrieveArtworks(searchTerm) {
  console.log(`Retrieving artworks from local storage with key: ${searchTerm}`);
  if (searchTerm in localStorage) 
}

export function retrieveNumberOfArtworks(searchTerm) {
  console.log(`Retrieving number of items from local storage with key: ${searchTerm}`);
  if (searchTerm in localStorage) {
    let arr = JSON.parse(localStorage[searchTerm]);
    return arr[1];
  }
}


export 