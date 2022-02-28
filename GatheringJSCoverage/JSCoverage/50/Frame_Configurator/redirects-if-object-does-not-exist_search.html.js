
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
        
    }
  
    /* Functions for fetching the Gallery-Items */
  
    async function showHighlights(){
      const response = await fetch("./highlights.json");}
  
    
  
    
  
    

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
  
    
    
  
    
  
    
  
    
  