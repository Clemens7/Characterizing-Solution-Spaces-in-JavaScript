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

const renderSingleSearchResult = 

const renderSearchResult = 

/**
 * Generates the search result gallery
 * @param {*} data
 */
const generateSearchResult = 

/**
 * Generates the search result gallery
 * @param {*} data
 */
const generateHighlights = async (objectIDs) => {
    let searchResult = await fetchObjects(objectIDs);}

/**
 *
 * @param {*} event
 */
const search = async () => {
  let searchTerm = searchInput.value;
  updateSearchQuery(searchTerm);

  if (searchTerm) 

  await fetch('./highlights.json').then(response => response.json()).then(response => {
    changeHeadline(headlineStates.start);
    generateHighlights(response.highlights);
  })
}

const queryParams = new URLSearchParams(window.location.search);

let form = document.querySelector('form');
form.addEventListener('submit', search);
document.addEventListener('submit', );

searchInput.value = queryParams.get('q');
showCartItems();
search();
