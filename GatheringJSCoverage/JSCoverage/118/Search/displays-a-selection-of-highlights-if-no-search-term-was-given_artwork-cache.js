export function retrieve(searchTerm) {
    if (searchTerm in localStorage)
}

export function store(searchTerm, artworks) {
    console.log(`Storing ${searchTerm} in local storage`);

    if(!artworks)

    localStorage[searchTerm] = JSON.stringify(artworks);
}
