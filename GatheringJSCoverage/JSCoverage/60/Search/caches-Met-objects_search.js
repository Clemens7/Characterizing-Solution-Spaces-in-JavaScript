class Artwork{
    constructor(artist, title, image, date){
        this.artist = artist;
        this.title = title;
        this.image = image;
        this.date = date;
    }
}

var ids;
//lädt sobald das window lädt
window.onload = init();
//beinhalted allen code der geladen werdensoll sobald die seite aufgerufen wird
function init(){
  //lädt die parameter aus der q query und sucht gleich wenn website mit q query parameter aufgerufen
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has('q')){
    const searchParam = urlParams.get('q');
    document.getElementById('search-info').innerHTML = 'Searching for &#8220;' + searchParam + '&#8221;...';
    console.log(searchParam);
    const images = retrieveTerm(searchParam);
  }
  //fügt die cart anzahl hinzu
  try{
    var cart = JSON.parse(window.localStorage.getItem("cart"));
    if(cart.length===0
  }catch(ex){
  }

  const form = document.querySelector('#searchForm')
  form.addEventListener('submit' , )
}

async function retrieveID(searchTerm) {
    let ids;

    if(searchTerm == null || searchTerm === '')
    else{
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
        console.log(url);

        try{
            const response = await fetch(url);
            const rawData = await response.json();
            ids = await rawData.objectIDs;
        }
        
    }
    return ids;
}

async function retrieveImage(ids){
    let images = new Array();

    for(let id of ids){
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        try{
            const response = await fetch(url);
            const rawData = await response.json();
            images.push(new Artwork(rawData.artistDisplayName, rawData.title, rawData.primaryImageSmall, rawData.objectDate));
            renderImage(new Artwork(rawData.artistDisplayName, rawData.title, rawData.primaryImageSmall, rawData.objectDate));
            if(images.length == 100)
          }
        
    }
    return images;
}

function renderImage(image){
  const artContainer = document.getElementById('gallery');

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    const link = document.createElement('a');
    link.href ='config.html?objectID='+ids[0];
    const img = document.createElement('img');
    img.src = image.image;
    const museumLabel = document.createElement('div');
    museumLabel.className = 'museum-label';
    const artist = document.createElement('span');
    artist.innerHTML = image.artist;
    artist.className = 'artist';
    const title = document.createElement('span');
    title.className = 'title';
    title.innerHTML = image.title+", "+image.date;
    /*const date = document.createElement('span');
    date.innerHTML = ',' + image.date;
    date.className = 'date';*/

    thumb.appendChild(link);
    link.appendChild(img);
    link.appendChild(museumLabel);
    museumLabel.appendChild(artist);
    museumLabel.appendChild(title);
    //museumLabel.appendChild(date);
    artContainer.appendChild(thumb);
}

async function retrieveTerm(searchTerm){
    ids = await retrieveID(searchTerm);
    console.log(ids)
    if(ids===null)
    else{
      const images = await retrieveImage(ids);
      console.log(images);
      if(images.length == 1)
      else if (searchTerm == '')
      else{
        document.getElementById('search-info').innerHTML = "Found " + images.length + ' artworks for &#8220;' + searchTerm + '&#8221;';
      }
      return images;
    }}
