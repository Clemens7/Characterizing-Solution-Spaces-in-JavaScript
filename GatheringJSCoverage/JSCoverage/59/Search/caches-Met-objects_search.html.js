
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
        arr.forEach(element => {
          buildItem(element);
        });
      });
    }

    const cart = document.getElementById("cart-link");
    var cartArr = JSON.parse(localStorage.getItem("cart"));
    if(cartArr.length > 0)
    
  
    function buildItem(id){
      getObjectById(id).then(function(obj){
          const gallery = document.getElementById("gallery");
          const container = document.createElement("div");
          container.classList.add("thumb");
          container.innerHTML = `
              <a href="./config.html?objectID=${obj.objectID}" id="object-${obj.objectID}">
                <img src="${obj.primaryImageSmall}" alt="${obj.title}" id="object-image-${obj.objectID}">
                <div class="museum-label">
                  <span class="artist">${obj.artistDisplayName}</span>
                  <span class="title">${obj.title}</span>,
                  <span class="date">${obj.objectDate}</span>
                </div>
              </a>
            `;
          gallery.appendChild(container);
      })
      
    }
  
    async function getObjects(query){
      const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' + query;
      var res = await fetch(url).then(function(response){
        return response.json();
      })
      if (!res || res.total < 1) 
      return res;
    }
  
    async function getObjectById(id){
      let res = JSON.parse(localStorage.getItem(id));
      if(!res)
      return res;
    }
  
  