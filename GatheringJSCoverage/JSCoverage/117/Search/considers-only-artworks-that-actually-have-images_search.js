const pictureElement = document.querySelector('.gallery');
const searchButton = document.querySelector('.search-button');
const searchItems = document.getElementById('search');
var count = 0;
let artworks = [];
const highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
const loc = window.location.href.split('?')[0];



const heading = document.getElementById('search-info');

if (window.location.href.split('?')[1]!=undefined)
{
  let s = 'Searching for “' + window.location.href.split('=')[1] + '”\.\.\.';
  heading.textContent = s.replace(/[+]/g, " ");
}




const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', )


async function getItems(values){
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" + values;
    const response = await fetch(url);}

function parseNamesFromInput(namesString){
  return namesString.split(',');
}

document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL (document.location)).searchParams;
  const pictureQuery = params.get('q');

  if (!pictureQuery)

  //console.log(pictureQuery);
  getItems(parseNamesFromInput(pictureQuery));

});


