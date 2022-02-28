



export function showNumItems() {
    let artworks = JSON.parse(localStorage.getItem("cart"));
    let counter = 0;
    for (let artwork in artworks)
    if (counter == 0){
        return "";
    }
}