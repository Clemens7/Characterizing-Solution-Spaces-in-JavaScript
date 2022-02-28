
    const urlParams = new URLSearchParams(window.location.search);
    const qv = urlParams.get('q');
    
  
    if(qv){
      const sinfo = document.getElementById("search-info");
      sinfo.innerHTML = `Searching for &ldquo;${qv}&rdquo;...`;
      
      getObjects(qv).then(function(res){
        const arr = res.objectIDs.slice(0, 100);
        const count = arr.length;
        if(count == 1)else{
          sinfo.innerHTML = `Found ${count} artworks for &ldquo;${qv}&rdquo;`;
        }
        arr.forEach();
      });
    }

    const cart = document.getElementById("cart-link");
    var cartArr = JSON.parse(localStorage.getItem("cart"));
    if(cartArr.length > 0)
    
  
    
  
    async function getObjects(query){
      const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' + query;
      var res = await fetch(url).then(function(response){
        return response.json();
      })
      if (!res || res.total < 1) {
          res = {total: 0, objectIDs:[]};
      }
      return res;
    }
  
    
  
  