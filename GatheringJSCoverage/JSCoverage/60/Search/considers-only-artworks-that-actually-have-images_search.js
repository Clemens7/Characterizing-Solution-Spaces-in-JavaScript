class Artwork{
    
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
    }}





async function retrieveTerm(searchTerm){
    ids = await retrieveID(searchTerm);}
