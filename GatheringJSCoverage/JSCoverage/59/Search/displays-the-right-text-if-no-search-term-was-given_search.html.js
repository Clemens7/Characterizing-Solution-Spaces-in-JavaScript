
    const urlParams = new URLSearchParams(window.location.search);
    const qv = urlParams.get('q');
    
  
    if(qv)else{
      fetch("./highlights.json").then(response => response.json()).then(obj => obj.highlights.forEach(id => buildItem(id)));
    }

    const cart = document.getElementById("cart-link");
    var cartArr = JSON.parse(localStorage.getItem("cart"));
    if(cartArr.length > 0)
    
  
    function buildItem(id){
      getObjectById(id).then()
      
    }
  
    
  
    async function getObjectById(id){
      let res = JSON.parse(localStorage.getItem(id));
      if(!res){
        const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id;
        res = await fetch(url).then(response => response.json());}
  
  