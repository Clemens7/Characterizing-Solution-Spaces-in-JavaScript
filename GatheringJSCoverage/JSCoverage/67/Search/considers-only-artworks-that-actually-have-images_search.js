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
const fetchObjects = 

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
const generateHighlights = 

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
    .then()
    .then()
    .catch();
    return;
  }}

const queryParams = new URLSearchParams(window.location.search);

let form = document.querySelector('form');
form.addEventListener('submit', search);
document.addEventListener('submit', );

searchInput.value = queryParams.get('q');
showCartItems();
search();
