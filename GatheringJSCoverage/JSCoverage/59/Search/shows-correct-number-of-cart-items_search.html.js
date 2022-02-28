
    const urlParams = new URLSearchParams(window.location.search);
    const qv = urlParams.get('q');
    
  
    if(qv)else{
      fetch("./highlights.json").then(response => response.json()).then(obj => obj.highlights.forEach(id => buildItem(id)));
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
  
    
  
    async function getObjectById(id){
      let res = JSON.parse(localStorage.getItem(id));
      if(!res)
      return res;
    }
  
  