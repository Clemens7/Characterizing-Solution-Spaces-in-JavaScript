
    import * as Frame from './frame.js';
    import * as API from './art-api.js';
    import * as Cart from './cart.js';

    Cart.updateCartString();
      
    const params = new URLSearchParams(window.location.search);
    const objectID = params.get('objectID');
    
    applyParams(params);

    if(objectID == null)

    API.retrieveObject(objectID).then(result => {
       if(result.message)
        document.getElementById("preview-image").src = result.primaryImageSmall;
        updateConfig();
        const imageLabel = document.getElementById("image-label");
        imageLabel.innerHTML = `
          <span class="artist">${result.artistDisplayName}</span>
          <span class="title">${result.title}</span>,
          <span class="date">${result.objectDate}</span>`;      
    })

    function applyParams(params){
       const form = document.getElementById("config-form"); 
       form["printSize"].value = params.get("printSize") ; 
       form["frameStyle"].value = params.get("frameStyle") ; 
       form["frameWidth"].value = params.get("frameWidth") / 10 ; 
       form["frameWidthR"].value = params.get("frameWdith") / 10 | 5; 
       form["matWidth"].value = params.get("matWidth") / 10 ;
       form["matWidth"].value = params.get("matWidth") / 10 ;  
       form["matColor"].value = params.get("matColor") ; 
    }

    window.updateConfig = function(){
      const form = document.getElementById("config-form");
      const previewImg = document.getElementById("preview-image");
      const container = document.getElementById("preview-container");
      const printSize = form["printSize"].value;
      const frameStyle = form["frameStyle"].value;
      const frameWidth = form["frameWidth"].value * 10;
      const matColor = form["matColor"].value;
      const matWidth = form["matWidth"].value * 10;

      const printSizes = Frame.getPrintSizes(previewImg);
      document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes.S[0]/10} × ${printSizes.S[1]/10} cm</label>`;
      document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes.M[0]/10} × ${printSizes.M[1]/10} cm</label>`;
      document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes.L[0]/10} × ${printSizes.L[1]/10} cm</label>`;
      
      Frame.render(previewImg, container, printSize, frameStyle, frameWidth, matColor, matWidth);

      document.getElementById("price").innerText = `€ ${Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`;
      document.getElementById('total-size').innerText = `${(printSizes[printSize][0] + 2 * frameWidth + 2 * matWidth)/10} × ${(printSizes[printSize][1] + 2 * frameWidth + 2 * matWidth)/10} cm`; 
    }

window.updateFrameWidth = 

   window.updateMatWidth = 

    window.addToCart = 
  