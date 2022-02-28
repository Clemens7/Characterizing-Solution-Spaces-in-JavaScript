
    adjustCartsTextIfNecessary();
   
    const form = document.getElementById("searchForm");
    form.addEventListener('submit', );

    document.addEventListener("DOMContentLoaded", event => {

      const params = (new URL(document.location)).searchParams;
      const q = params.get("q");
     
      if(!q)
      const inputField = document.getElementById("search");
      inputField.value = q;
      search(q);
    });
  
    class GalleryItem{
        
    }
  
    /* Functions for fetching the Gallery-Items */
  
    
  
    async function search(searchInput){
      editSearchInfo(`Searching for “${searchInput}”...`);
      const idJson = await getIdsForQuery(searchInput);
      const items = await getGalleryItemsByID(idJson.objectIDs);
      createGallery(items);
      editSearchInfo(searchInputResponseText(items.length, searchInput));
    }
  
    async function getIdsForQuery(query){
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);
      const rawData = await response.json();
      return await rawData;
    }
  
    async function getGalleryItemsByID(ids){
  
    let items = [];
    const promises = [];
    const itemsJsonFromLocalStorage = [];
  
    if(ids != null)
      return items;
    }

    /*Functions to adjust Cart Text (id cart-link) in the nav to show amounts of items in the cart*/

    function adjustCartsTextIfNecessary(){
      const amount = getAmountOfItemsInCart();
      if(amount > 0)
    }

    function getAmountOfItemsInCart(){
      const json = JSON.parse(window.localStorage.getItem('cart'));
      if(json == null)
        return 0;}

    /*Functions for manupilating the DOM */
  
    function editSearchInfo(text){
      const searchInfo = document.getElementById("search-info");
      searchInfo.innerText = text;
    }
    function searchInputResponseText(total, query){
      if(total > 1 || total == 0){
        return `Found ${total} artworks for “${query}”`;
      }}
  
    function createGallery(items){
      const gallery = document.getElementById("gallery");
      for(let item of items)
    }
  
    
  
    
  