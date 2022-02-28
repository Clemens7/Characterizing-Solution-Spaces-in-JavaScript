import * as API from './met-api.js';
import { getQueryParameter, setCartQty } from './helpers.js';
import * as DOM from './dom-helpers.js';

const setHeadline = 

const searchCollection = async (term) => {
  const CHUNKSIZE = 10;

  let ids = [];

  const container = document.getElementById('gallery');
  container.innerHTML = '';

  if(term) else {
    const repsonse = await fetch('./highlights.json')
    const data = await repsonse.json();
    ids = ids.concat(data.highlights);
  }

  const jobs = ids.map(id => API.fetchObjectData(id));

  //split jobs in chunks
  const chunks = jobs.reduce((chunks, job, i) => {
    const chunkIndex = Math.floor(i/CHUNKSIZE);
    if(!chunks[chunkIndex]){
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(job);
    return chunks;
  }, []);
  
  for (const chunk of chunks) {
    console.log(chunk);
    
    const objects = await Promise.all(chunk);}

const renderEntry = 

document.addEventListener('DOMContentLoaded', event => {
  setCartQty();
  const term = getQueryParameter('q');
  if(term)
  searchCollection(term);
});

const form = document.querySelector('.search-form');
form.addEventListener('submit', );