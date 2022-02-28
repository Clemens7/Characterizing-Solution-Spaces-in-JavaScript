
    adjustCartsTextIfNecessary();
   
    const form = document.getElementById("searchForm");
    form.addEventListener('submit', );

    document.addEventListener("DOMContentLoaded", event => {

      const params = (new URL(document.location)).searchParams;
      const q = params.get("q");
     
      if(!q){
        showHighlights();
        return;
      }});
  
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
  
    async function showHighlights(){
      const response = await fetch("./highlights.json");
      const json = await response.json();
      const items = await getGalleryItemsByID(json.highlights);
      createGallery(items);
    }
  
    
  
    
  
    async function getGalleryItemsByID(ids){
  
    let items = [];
    const promises = [];
    const itemsJsonFromLocalStorage = [];
  
    if(ids != null){
      if(ids.length > 100)    

      for(let id of ids){
          let json = JSON.parse(window.localStorage.getItem(id));
          if(!json)else{
              itemsJsonFromLocalStorage.push(json);
          }
      }
    
      const responses = await Promise.all(promises);
      //const jsonPromises = await responses.map(response => response.json());


      const jsonPromises = await responses.map()
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
        
      
      return json.length;
    }

    /*Functions for manupilating the DOM */
  
    
    
  
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
  