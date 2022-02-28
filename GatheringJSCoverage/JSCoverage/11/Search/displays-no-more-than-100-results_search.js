const baseURL       = "https://collectionapi.metmuseum.org";
const searchURL     = "/public/collection/v1/search";
const objURL        = "/public/collection/v1/objects/";
const highlightsURL = "highlights.json";

const gallery    = document.getElementById("gallery");
const searchInfo = document.getElementById("search-info");
const cartLink   = document.getElementById("cart-link");
const searchForm = document.getElementsByClassName("search-form")[0];

var cartObject = JSON.parse(localStorage.getItem('cart'));
if (cartObject)
const maxNumResults = 100;

let thisURL = new URL(document.location);
let query   = thisURL.searchParams.get("q");

searchForm.addEventListener("submit", );

search(query);

async function search(searchTerm) {
  gallery.innerHTML = "";
  let data = null;
  if (!searchTerm)  else {
    searchInfo.textContent = `Searching for \u{0201C}${searchTerm}\u{0201D}...`;
    data = await fetchResults(baseURL + searchURL + "?hasImages=true&q=" + searchTerm);
    let pluralization = data.total === 1  : "artworks";
    searchInfo.textContent = `Found ${data.total} ${pluralization} for \u{0201C}${searchTerm}\u{0201D}`;
  }
  showResults(data.objectIDs);
}

async function fetchResults(url) {
  let result = await fetch(url);
  let data   = await(result.json());
  return data;
}

async function showResults(objectIDs) {
  objectIDs = objectIDs.slice(0, maxNumResults);
  Promise.all(
    objectIDs.map(async id => {
      let data  = null;
      let cache = window.localStorage;
      if (cache.getItem(id))  else {
        data = await fetchResults(baseURL + objURL + id);
        cache.setItem(id, JSON.stringify(data));
      }
      
      let galleryItemTemplate =
      `<div class="thumb">
        <a href="${"config.html?objectID=" + id}" id="object-${id}">
          <img src="${data.primaryImageSmall}" alt="${data.title}" id="object-image-${id}">
          <div class="museum-label">
            <span class="artist">${data.artistDisplayName}</span>
            <span class="title">${data.title}</span>,
            <span class="date">${data.objectDate}</span>
          </div>
        </a>
      </div>`;
      gallery.insertAdjacentHTML("beforeend", galleryItemTemplate);
    })
  );
}
