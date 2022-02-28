import {
  getObjectIds,
  getHighlights,
  getGalleryItems,
} from "./search-api-calls.js";
import { getFromLocalStorage } from "./print-objects-cache.js";

/*let cartVar = localStorage.getItem('cartItems');
console.log(cartVar);
if (cartVar != "0") {
    const cartSize = document.getElementById("cart-link");
    cartSize.innerText = 'Cart (' + cartVar + ')';
}*/




/*let cartItems = getFromLocalStorage();
localStorage.setItem('cartItems', JSON.parse(cartItems.length));
console.log(localStorage.getItem('cartItems'));
const cartSize = document.getElementById("cart-link");
cartSize.innerText = `Cart (${cartItems.length})`;

if (cartItems.length === 0 ) {
  cartSize.innerText = `Cart`;
}*/

//query search
const url = window.location.href;
if (url.indexOf("q=") !== -1)  else {
  searchHighlights();
}

//search field search
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("search");
  if (!searchInput.value)  else {
    const searchString = searchInput.value;
    searchGallery(searchString);
  }
});

async function searchHighlights() {
  let galleryItems = await getHighlights();
  renderGalleryItems(galleryItems);
}

async function searchGallery(searchString) {
  let searchText = document.getElementById("search-info");
  searchText.innerText = `Searching for “${searchString}”...`;
  const retrievedObjectIds = await getObjectIds(searchString);
  if (retrievedObjectIds == null)  else {
    let galleryItems = await getGalleryItems(retrievedObjectIds);
    console.log(galleryItems);
    let artworkWord = retrievedObjectIds.length == 1  : "artworks";
    let numberOfItems =
      retrievedObjectIds == null  : retrievedObjectIds.length;
    searchText.innerText = `Found ${numberOfItems} ${artworkWord} for “${searchString}”`;
    renderGalleryItems(galleryItems);
  }
}

function renderGalleryItems(galleryItems) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  for (let galleryItem of galleryItems) {
    const thumb = document.createElement("div");
    thumb.classList.add("thumb");
    thumb.innerHTML = `
      <a id="${galleryItem.objectID}" href="config.html?objectID=${galleryItem.objectID}">
        <img src="${galleryItem.primaryImage}" alt="" id="object-image-${galleryItem.objectID}" />
        <div class="museum-label">
          <span class="artist">${galleryItem.artistDisplayName}</span>
          <span class="title">${galleryItem.title}</span>,
          <span class="date">${galleryItem.date}</span>
        </div>
      </a>`;
    gallery.appendChild(thumb);
  }
}
