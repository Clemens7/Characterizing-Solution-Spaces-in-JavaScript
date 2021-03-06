
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
        constructor(id, title, artist, date, imgSrc){
          this.id = id;
          this.title = title;
          this.artist = artist;
          this.date = date;
          this.imgSrc = imgSrc;
        }
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
  
    if(ids != null){
      if(ids.length > 100)    

      for(let id of ids){
          let json = JSON.parse(window.localStorage.getItem(id));
          if(!json){
              promises.push(fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`));
          }
      }
    
      const responses = await Promise.all(promises);
      //const jsonPromises = await responses.map(response => response.json());


      const jsonPromises = await responses.map(async(response) => {
        const json = await response.json();
        window.localStorage.setItem(json.objectID, JSON.stringify(json));
        return json;
      })
      const itemsJsonFromPromise = await Promise.all(jsonPromises); 
      const itemsJson = itemsJsonFromPromise.concat(itemsJsonFromLocalStorage);


      items = await Promise.all(itemsJson.map(
        async(jsonObject) => {
          return new GalleryItem(jsonObject.objectID, jsonObject.title, jsonObject.artistDisplayName, jsonObject.objectDate, jsonObject.primaryImageSmall);
        }
      ));
    }
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
      if(total > 1 ){
        return `Found ${total} artworks for “${query}”`;
      }}
  
    function createGallery(items){
      const gallery = document.getElementById("gallery");
      for(let item of items){
        gallery.appendChild(createGalleryElement(item));
      }
    }
  
    function createGalleryElement(object){
      const item = document.createElement("div");
      item.classList.add("thumb");
  
      const anchor = document.createElement("a");
      anchor.setAttribute("href", `./config.html?objectID=${object.id}`);
      anchor.setAttribute("id", `object-${object.id}`)
  
      const image = document.createElement("img");
      const label = document.createElement("div");
  
      image.setAttribute("src", object.imgSrc);
      image.setAttribute("alt", `${object.title}`);
      image.setAttribute("id", `object-image-${object.id}`);
  
      label.classList.add("museum-label");
 
      label.appendChild(createLabelElement("artist", object.artist));
      const title = createLabelElement("title", object.title);
      label.appendChild(title);
      title.after(", ");
      label.appendChild(createLabelElement("date", object.date));
  
      anchor.appendChild(image);
      anchor.appendChild(label);
  
      item.appendChild(anchor); 
  
      return item;
    }
  
    function createLabelElement(type, text){
      let element = document.createElement("span");
      element.classList.add(type);
      element.innerText = text;
      return element;
    }
  