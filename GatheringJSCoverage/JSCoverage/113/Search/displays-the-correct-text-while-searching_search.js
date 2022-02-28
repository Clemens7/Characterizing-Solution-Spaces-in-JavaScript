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
    
    const objects = await Promise.all(chunk); 
    for (const object of objects) {
      container.appendChild(renderEntry(object));
    }
  }
}

const renderEntry = (object) => {
  const artist = DOM.setAttributes(DOM.textElement('span', object.artist),{class: ['artist']});
  const title = DOM.setAttributes(DOM.textElement('span', `${object.title}, `),{class: ['title']});
  const date = DOM.setAttributes(DOM.textElement('span', object.year),{class: ['date']});
  const label = DOM.setAttributes(DOM.container([artist, title, date]),{class: ['museum-label']});
  const img = DOM.setAttributes(DOM.img(object.url,object.title),{id: `object-image-${object.id}`})
  const link = DOM.setAttributes(DOM.container([img, label],'a'),{href: `config.html?objectID=${object.id}`, id: `object-${object.id}`})

  return DOM.setAttributes(DOM.setAttributes(DOM.container([link]), {class: ['thumb']}));
}

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