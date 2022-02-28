const inputValue = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const searchInfo = document.querySelector("#search-info");
const galleryContainer = document.getElementById("gallery");

/*Add an artwork to the specified container in the document*/
async function addArtworkToDocument(artwork) {
  let data = artwork;
  //let cache = window.sessionStorage.getItem(artwork.objectID);
  try {
    let thumb = document.createElement("div");
    thumb.className = "thumb";

    let currentObj = document.createElement("a");
    currentObj.id = "object-" + artwork.objectID;
    currentObj.href = `./config.html?objectID=${artwork.objectID}`;

    let imgContainer = document.createElement("img");
    imgContainer.src = data.primaryImageSmall;
    imgContainer.alt = data.title;
    imgContainer.id = "object-image-" + artwork.objectID;
    //console.log(imgContainer);

    let museumLabelContainer = document.createElement("div");
    museumLabelContainer.className = "museum-label";

    let artistContainer = document.createElement("span");
    artistContainer.textContent = data.artistDisplayName;
    artistContainer.className = "artist";

    let titleContainer = document.createElement("span");
    titleContainer.textContent = data.title;
    titleContainer.className = "title";

    let dateContainer = document.createElement("span");
    dateContainer.textContent = ", " + data.objectDate;
    dateContainer.className = "date";

    museumLabelContainer.appendChild(artistContainer);
    museumLabelContainer.appendChild(titleContainer);
    museumLabelContainer.appendChild(dateContainer);
    currentObj.appendChild(imgContainer);
    currentObj.appendChild(museumLabelContainer);
    thumb.appendChild(currentObj);
    galleryContainer.appendChild(thumb);
  } 
}
//console.log("Test");
const urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');
console.log(searchTerm);
cartLinkCounter();
inputValue.addEventListener("input", );
fetchArtworks(searchTerm);

/*Get all artwork IDs that match the search parameters*/
async function fetchArtworks(searchTerm) {
  if (searchTerm == null) {
    let response = await fetch('highlights.json');
    //console.log(response);
    let highlights = await response.json();
    //console.log(highlights);
    for(let artwork of highlights.highlights){
      getArtObj(artwork).then(artObj => {
        if (artObj.primaryImageSmall != null) {
          addArtworkToDocument(artObj);
        }
      });

    } return;
  }}
export async function getArtObj(objectID) {
    let artObj = null;
    let artCache = JSON.parse(window.localStorage.getItem("artCache"));
    if (artCache!=null) {
        artObj = artCache[objectID];
    }
    if (artObj != null) {
        return artObj;
    }
    const imgResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    artObj = await imgResponse.json();
    //console.log(imgResponse);
    if(imgResponse.status!==200) 
    if (artCache == null) 
    artCache[objectID] = artObj;
    window.localStorage.setItem("artCache",JSON.stringify(artCache));
    return artObj;
}
searchButton.addEventListener("click", );
function cartLinkCounter(){
  let numberOfItems = JSON.parse(window.localStorage.getItem("cart")) != null ? JSON.parse(window.localStorage.getItem("cart")).length 
    if(numberOfItems == 0){
        document.getElementById("cart-link").innerText = `Cart`
    }

}
