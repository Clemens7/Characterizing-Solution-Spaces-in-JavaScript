import { searchApiUrl, fetchObject, showCartItems } from "./common.js";

const searchInput = document.getElementById('search');
const headlineStates = {
  start: 'Search our collection of more than 400,000 artworks.',
  searching: 'Searching for “*”...',
  found: 'Found # artworks for “*”',
  foundOne: 'Found # artwork for “*”'
}

/**
 *
 * @param {string} searchTerm
 */
const updateSearchQuery = async (searchTerm) => {
  let newUrl = new URL(window.location.href);
  newUrl.search = new URLSearchParams({ q: searchTerm }).toString();
  window.history.replaceState( {}, document.title, newUrl);
};

/**
 *
 * @param {*} objectIDs
 */
const fetchObjects = async (objectIDs) => {
  let maxSearchResults = 100;
  let reducedObjectIDs = objectIDs.slice(0, maxSearchResults);
  return await Promise.all(reducedObjectIDs.map(async (objectID) => {
    return await fetchObject(objectID);
  }));
}

const changeHeadline = async (state, term, number) => {
  let headline = document.getElementById('search-info');
  headline.textContent = state.replace('*', term).replace('#', number);
}

const renderSingleSearchResult = (singleSearchResult) => {
  let template = document.querySelector('template');
  let clone = template.content.cloneNode(true);

  let link = clone.querySelector('a');
  link.href = `./config.html?objectID=${singleSearchResult.objectID}`;

  let img = clone.querySelector('img');
  img.src = singleSearchResult.primaryImageSmall;

  let description = clone.querySelectorAll('span');
  description[0].textContent = singleSearchResult.artistDisplayName;
  description[1].textContent = singleSearchResult.title;
  description[2].textContent = singleSearchResult.objectDate

  template.parentNode.appendChild(clone);
}

const renderSearchResult = async (searchResult) => {
  let gallery = document.getElementById('gallery');
  gallery.querySelectorAll('.thumb').forEach((element) => { gallery.removeChild(element)});
  searchResult.forEach((element) => {
    renderSingleSearchResult(element);
  });
}

/**
 * Generates the search result gallery
 * @param {*} data
 */
const generateSearchResult = async (data, searchTerm) => {
  if (data.total > 0) {
    let searchResult = await fetchObjects(data.objectIDs);
    data.total === 1  :
      changeHeadline(headlineStates.found, searchTerm, searchResult.length);
    renderSearchResult(searchResult);
  }
}

/**
 * Generates the search result gallery
 * @param {*} data
 */
const generateHighlights = async (objectIDs) => {
    let searchResult = await fetchObjects(objectIDs);
    renderSearchResult(searchResult);
}

/**
 *
 * @param {*} event
 */
const search = async () => {
  let searchTerm = searchInput.value;
  updateSearchQuery(searchTerm);

  if (searchTerm) {
    changeHeadline(headlineStates.searching, searchTerm);
    fetch(searchApiUrl + `?q=${searchTerm}&hasImages=true`)
    .then(response => response.json())
    .then(data => {
        generateSearchResult(data, searchTerm);
    })
    .catch();
    return;
  }

  await fetch('./highlights.json').then(response => response.json()).then(response => {
    changeHeadline(headlineStates.start);
    generateHighlights(response.highlights);
  })
}

const queryParams = new URLSearchParams(window.location.search);

let form = document.querySelector('form');
form.addEventListener('submit', search);
document.addEventListener('submit', (event) => {event.preventDefault()});

searchInput.value = queryParams.get('q');
showCartItems();
search();
