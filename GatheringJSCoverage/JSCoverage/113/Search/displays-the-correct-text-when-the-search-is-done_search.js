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
    const data = await API.search(term);
    ids = ids.concat(data.slice(0,100));
    setHeadline(`Found ${ids.length} ${ids.length === 1  : 'artworks'} for “${term}”`)
  }

  const jobs = ids.map();

  //split jobs in chunks
  const chunks = jobs.reduce(, []);
  
  for (const chunk of chunks) 
}

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