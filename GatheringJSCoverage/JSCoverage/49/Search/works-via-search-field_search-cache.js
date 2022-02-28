export function retrieve(search){
    if(search in localStorage){
        return JSON.parse(localStorage[search]);
    }
}
export function store(search, artworks){
    localStorage[search] = JSON.stringify(artworks);
}
