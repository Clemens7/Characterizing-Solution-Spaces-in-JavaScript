
    import * as Cart from './cart.js';
    import * as Frame from './frame.js';
    import * as Met_museum from './met_museum.js';

    Cart.countProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('objectID');
    const form = document.getElementById('config-form');

    form['printSize'].value = urlParams.get('printSize') || 'M';
    form['frameStyle'].value = urlParams.get('frameStyle') || 'classic';
    form['frameWidth'].value = form['frameWidthR'].value = urlParams.get('frameWidth') / 10 || 4;
    form['matColor'].value = urlParams.get('matColor') || 'mint';

    if (urlParams.get('matWidth'))  else {
      form['matWidth'].value = form['matWidthR'].value = 5.5;
    }

    Met_museum.getObject(objectID).then(obj => {

      if (obj == null) 

      document.title = `${obj.artistDisplayName}, ${obj.title}, ${obj.objectDate} | Artmart`;
      document.getElementById("object-id").value = obj.objectID;

      const previewImg = document.getElementById("preview-image");
      previewImg.src = obj.primaryImageSmall;

      const imageLabel = document.getElementById("image-label");
      
      imageLabel.innerHTML = `
          <span class="artist">${obj.artistDisplayName}</span>
          <span class="title">${obj.title}</span>,
          <span class="date">${obj.objectDate}</span>`

      window.render();
    });

    window.updateFrameWidth = 

    window.updateMatWidth = 

    

    window.render = function () {
      const form = document.getElementById('config-form');
      const previewImg = document.getElementById("preview-image");
      const container = document.getElementById("preview-container");
      const printSize = form['printSize'].value;
      const frameStyle = form['frameStyle'].value;
      const frameWidth = form['frameWidth'].value * 10;
      const matColor = form['matColor'].value;
      const matWidth = form['matWidth'].value * 10;
      Frame.render(previewImg, container, printSize, frameStyle, frameWidth, matColor, matWidth);

      const printSizes = Frame.getPrintSizes(previewImg);
      const totalWidth = printSizes[printSize][0] + 2 * frameWidth + 2 * matWidth;
      const totalHeight = printSizes[printSize][1] + 2 * frameWidth + 2 * matWidth;

      document.getElementById("print-size-s-label").innerHTML = `Small <br>${printSizes['S'][0] / 10} × ${printSizes['S'][1] / 10} cm`
      document.getElementById("print-size-m-label").innerHTML = `Medium<br>${printSizes['M'][0] / 10} × ${printSizes['M'][1] / 10} cm`
      document.getElementById("print-size-l-label").innerHTML = `Large <br>${printSizes['L'][0] / 10} × ${printSizes['L'][1] / 10} cm`
      document.getElementById('total-size').innerHTML = `${totalWidth / 10} × ${totalHeight / 10} cm`;

      const price = Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
      document.getElementById('price').innerHTML = `€ ${price.toFixed(2)}`;
    }

    window.addEventListener("resize", render);

    window.addToCart = 
  