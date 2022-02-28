const inputValue = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const searchInfo = document.querySelector("#search-info");
const galleryContainer = document.getElementById("gallery");

/*Add an artwork to the specified container in the document*/

//console.log("Test");
const urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');
console.log(searchTerm);
cartLinkCounter();
inputValue.addEventListener("input", );
fetchArtworks(searchTerm);

/*Get all artwork IDs that match the search parameters*/
async function fetchArtworks(searchTerm) {
  if (searchTerm == null||searchTerm == "") 
  searchTerm = searchTerm.replace('+',' ');
  searchInfo.innerText = "Searching for “" + searchTerm + "”...";
  //console.log(params);
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q="${searchTerm}"`;
  const api_call = await fetch(url);}
export 
searchButton.addEventListener("click", );
function cartLinkCounter(){
  let numberOfItems = JSON.parse(window.localStorage.getItem("cart")) != null  : 0
    if(numberOfItems == 0){
        document.getElementById("cart-link").innerText = `Cart`
    }

}
