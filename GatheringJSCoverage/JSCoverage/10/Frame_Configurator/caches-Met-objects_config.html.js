
    import {FrameConfig} from "./frameconfig.js";
    import * as Api from "./artwork-api.js";
    import * as Frame from "./frame.js"
    import * as Cache from "./artwork-cache.js"
    import * as Cart from "./cart-cache.js"

    const frameConfig = new FrameConfig(
            -1,
            'M',
            "natural",
            40,
            "mint",
            55
    );

    let artwork;
    const imgContainer = document.getElementById("preview-container")
    const img = document.getElementById("preview-image")

    document.getElementById("add-to-cart").addEventListener("click",)

    document.addEventListener("DOMContentLoaded",async evt => {
      const cart = Cart.retrieveCart();
      if (cart) 
      const params = (new URL(document.location)).searchParams;
      handleParams(params);
      updatePrice();
      const objectID = params.get('objectID');
      if (!objectID)
      frameConfig.objectID = objectID;
      artwork = Cache.retrieveByObjectID(objectID);
      if (!artwork) 
      img.src = artwork.imageLink;
      img.alt = artwork.alt;
      setPrintSizes()
      updateSizeIncl();
      setLabel()
      renderImage()
      const allInputs = document.querySelectorAll("input");
      allInputs.forEach(item => item.addEventListener("change",))
    })

    function updateSizeIncl(){
      const sizes = Frame.getPrintSizes(img);
      document.getElementById("total-size").innerText = `${(
              sizes[frameConfig.printSize][0] + frameConfig.matWidth * 2 + frameConfig.frameWidth * 2)/10
      } × ${(
              sizes[frameConfig.printSize][1] + frameConfig.matWidth * 2 + frameConfig.frameWidth * 2)/10
      } cm`

    }

    

    function handleParams(params) {
      const printSize  = params.get("printSize");
      const frameStyle = params.get("frameStyle");
      const frameWidth = params.get("frameWidth");
      const matColor   = params.get("matColor");
      const matWidth   = params.get("matWidth");
      if (printSize)
      if (frameStyle)
      if (frameWidth)
      if (matColor)
      if (matWidth)

    }

    

    

    

    

    

    

    


    function setPrintSizes() {
      const sizes = Frame.getPrintSizes(img);
      document.getElementById("print-size-s-label").innerHTML = `Small<br>${sizes.S[0]/10} × ${sizes.S[1]/10} cm`
      document.getElementById("print-size-m-label").innerHTML = `Medium<br>${sizes.M[0]/10} × ${sizes.M[1]/10} cm`
      document.getElementById("print-size-l-label").innerHTML = `Large<br>${sizes.L[0]/10} × ${sizes.L[1]/10} cm`
    }

    function setLabel() {
      const label = document.getElementById("image-label");
      const artist = document.createElement("span");
      artist.classList.add("artist");
      artist.innerText = artwork.artist;
      label.appendChild(artist);
      const title = document.createElement("span");
      title.classList.add("title");
      title.innerText = `${artwork.title}, `;
      label.appendChild(title);
      const date = document.createElement("span");
      date.classList.add("date");
      date.innerText = artwork.date;
      label.appendChild(date);
    }

    function renderImage() {
      Frame.render(
              img,
              imgContainer,
              frameConfig.printSize,
              frameConfig.frameStyle,
              frameConfig.frameWidth,
              frameConfig.matColor,
              frameConfig.matWidth
      )
    }

    function updatePrice() {
      document.getElementById("price").innerText ="€ " + Frame.calculatePrice(
              frameConfig.printSize,
              frameConfig.frameStyle,
              frameConfig.frameWidth,
              frameConfig.matWidth
      ).toFixed(2)
    }
  