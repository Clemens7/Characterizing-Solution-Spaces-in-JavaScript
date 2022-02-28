export function retrieve(search){
    if(search in localStorage)
}
export function store(search, artworks){
    localStorage[search] = JSON.stringify(artworks);
}
