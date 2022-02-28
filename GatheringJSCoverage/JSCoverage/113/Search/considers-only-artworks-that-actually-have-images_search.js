import * as API from './met-api.js';
import { getQueryParameter, setCartQty } from './helpers.js';
import * as DOM from './dom-helpers.js';

const setHeadline = (text) => {
  const headline = document.getElementById('search-info');  
  headline.innerText = text;
}

const searchCollection = async (term) => {
  const CHUNKSIZE = 10;

  let ids = [];

  const container = document.getElementById('gallery');
  container.innerHTML = '';

  if(term){
    setHeadline(`Searching for “${term}”...`)
    const data = await API.search(term);} for “${term}”`)
  }}

const renderEntry = 

document.addEventListener('DOMContentLoaded', event => {
  setCartQty();
  const term = getQueryParameter('q');
  if(term){
    const searchInput = document.getElementById('search');
    searchInput.value = term;
  }
  searchCollection(term);
});

const form = document.querySelector('.search-form');
form.addEventListener('submit', );