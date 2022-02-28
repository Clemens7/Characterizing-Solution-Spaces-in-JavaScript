

    import * as Frame from "./frame.js";

    const cart = document.getElementById("cart-link");
    var cartArr = JSON.parse(localStorage.getItem("cart"));
    if(cartArr != null 

    const queryParams = new URLSearchParams(window.location.search);
    const objID = queryParams.get("objectID");
    const form = document.getElementById("config-form");

    form["printSize"].value = queryParams.get("printSize") ;
    form["frameStyle"].value = queryParams.get("frameStyle") ;
    form["matColor"].value = queryParams.get("matColor") ;
    form["frameWidth"].value = queryParams.get("frameWidth") / 10 ;
    form["frameWidthR"].value = form["frameWidth"].value;
    form["matWidth"].value = queryParams.get("matWidth") / 10 ;
    form["matWidthR"].value = form["matWidth"].value;

    getObjectByID(objID).then(obj => {
      if(obj == null) 
      document.getElementById("object-id").value = obj.objectID;

      const previewImg = document.getElementById("preview-image");
      previewImg.src = obj.primaryImageSmall;
      const imageLabel = document.getElementById("image-label");
      imageLabel.innerHTML = '<span class="artist">' +obj.artistDisplayName+ '</span>' +
              ' <span class="title">'+obj.title+'</span> ' +
              '<span class="date">'+obj.objectDate+'</span>';

      render();
    });

    async function getObjectByID(objID){
      let obj = JSON.parse(localStorage.getItem(objID));
      if(!obj){
        const objUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objID;
        obj = await fetch(objUrl).then(data => data.json());
        if(!obj || obj.objectID == null)
        localStorage.setItem(obj.objectID, JSON.stringify(obj));
      }
      return obj;
    }

    window.render = function render(){
      const container = document.getElementById("preview-container");
      const previewImg = document.getElementById("preview-image");
      const form = document.getElementById("config-form");
      const printSize = form["printSize"].value;
      const frameStyle = form["frameStyle"].value;
      const frameWidth = form["frameWidth"].value * 10;
      const matColor = form["matColor"].value;
      const matWidth = form["matWidth"].value * 10;
      Frame.render(previewImg, container, printSize, frameStyle, frameWidth, matColor, matWidth);

      const printSizes = Frame.getPrintSizes(previewImg);
      const totalWidth = printSizes[printSize][0] + 2 * frameWidth + 2 * matWidth;
      const totalHeight = printSizes[printSize][1] + 2 * frameWidth + 2 * matWidth;
      document.getElementById("print-size-s-label").innerHTML = 'Small <br>'+ (printSizes['S'][0] / 10)+ '×'+ (printSizes['S'][1] / 10) +'cm';
      document.getElementById("print-size-m-label").innerHTML = 'Medium<br>'+ (printSizes['M'][0] / 10)+ '×'+ (printSizes['M'][1] / 10) +'cm';
      document.getElementById("print-size-l-label").innerHTML = 'Large <br>'+ (printSizes['L'][0] / 10)+ '×'+ (printSizes['L'][1] / 10) +'cm';
      document.getElementById("total-size").innerHTML = totalWidth / 10 + '×' + totalHeight / 10 +'cm';

      const price = Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
      document.getElementById('price').innerHTML = '€ '+price.toFixed(2);
    }

    window.updateMatSlider =  
  
    window.updateFrameSlider = 

    window.addToCart = 
  
  