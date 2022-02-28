// window.onload = function () {
//     search();
// };

class artElement {
    
}

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    console.log('q' + params.get('q'));
    const searchTerm = params.get('q');

    updateCart();

    if(!searchTerm) else {
        changeSearchInfo(`Searching for “${searchTerm}”...`);
        searchForParams(searchTerm);
    }
})



async function searchForParams(searchTerm){
    let resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`)
    resp = await resp.json();}





function changeSearchInfo(newInfo) {
    document.getElementById("search-info").innerText=newInfo;
}





function updateCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart 
}