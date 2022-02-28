



export function showNumItems() {
    let artworks = JSON.parse(localStorage.getItem("cart"));
    let counter = 0;
    for (let artwork in artworks){
        counter += 1;
    }
    if (counter == 0)
    else {
        return " (" + counter + ")";
    }
}