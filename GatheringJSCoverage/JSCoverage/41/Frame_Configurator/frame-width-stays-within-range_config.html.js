
    import * as MetAPI from './metAPI.js';
    import * as Frame from './frame.js';
    import * as CartCache from './cartCache.js';
    import { Cart } from './cart.js'
		import * as cartLinkHelper from './cartLinkHelper.js';

    async function retrieveObj(objectID){
      let obj = await MetAPI.retrieveObj(objectID);
      if(!obj.primaryImage) 
      let img = document.getElementById("preview-image");
      img.src = obj.primaryImage;
      img.onload = () => {
        displayPrintSizes();
        displayPrice();
        renderImg();
        let form = document.getElementById("config-form");
        form.addEventListener('change', () => { renderImg(); });
        form.addEventListener('change', () => { displayPrintSizes(); });
        form.addEventListener('change', () => { displayPrice(); });
      };

      document.getElementById("image-label").innerHTML =
        `<strong>${obj.artistDisplayName}<strong><br>` +
        `<i>${obj.title}<i>, ${obj.objectDate}`;
    }

    function stayInRange(element, min, max) {
      if (element.value < min) { element.value = min; }
      if (element.value > max) { element.value = max; }
      element.value = Math.round(element.value * 10) / 10;
    }

    document.addEventListener('DOMContentLoaded', event => {
        const params = (new URL(document.location)).searchParams;
        const objectID = params.get('objectID');
        const printSize = params.get('printSize');
        const frameStyle = params.get('frameStyle');
        const frameWidth = params.get('frameWidth');
        const matColor = params.get('matColor');
        const matWidth = params.get('matWidth');

        if (!objectID) 
        retrieveObj(objectID);
        document.getElementById("object-id").value = objectID;

        let frameTxt = document.getElementById("frameWidthTxt");
        let frameSlider = document.getElementById("frameWidthSlider");
        frameTxt.addEventListener('change',
          function() {
            stayInRange(frameTxt, 2, 5);
            frameSlider.value = frameTxt.value
          });
        frameSlider.addEventListener('change',
          );

        let matTxt = document.getElementById("matWidthTxt");
        let matSlider = document.getElementById("matWidthSlider");
        matTxt.addEventListener('change',
          );
        matSlider.addEventListener('change',
          );

        if (printSize) 
        if (frameStyle) 
        if (frameWidth) 
        if (matColor) 
        if (matWidth) 

        let form = document.getElementById("config-form");
        form.addEventListener("submit", );

        form.addEventListener('submit', );
    });

    

    function displayPrice() {
      let price = Frame.calculatePrice(
        document.querySelector('input[name="printSize"]:checked').value,
        document.querySelector('input[name="frameStyle"]:checked').value,
        document.getElementById("frameWidthSlider").value,
        document.getElementById("matWidthSlider").value);
      document.getElementById("price").innerHTML = `€ ${price.toFixed(2)}`;
    }

    function renderImg(){
      let img = document.getElementById("preview-image");
      if (img == null) 
      Frame.render(img,
        document.getElementById("preview-container"),
        document.querySelector('input[name="printSize"]:checked').value,
        document.querySelector('input[name="frameStyle"]:checked').value,
        document.getElementById("frameWidthSlider").value,
        document.querySelector('input[name="matColor"]:checked').value,
        document.getElementById("matWidthSlider").value);
    }

    function displayPrintSizes() {
      let img = document.getElementById("preview-image");
      let sizes = Frame.getPrintSizes(img);
      let sizeLabelS = document.getElementById("print-size-s-label");
      let sizeLabelM = document.getElementById("print-size-m-label");
      let sizeLabelL = document.getElementById("print-size-l-label");
      sizeLabelS.innerHTML = `Small<br>${sizes.S[0]} × ${sizes.S[1]} cm`;
      sizeLabelM.innerHTML = `Medium<br>${sizes.M[0]} × ${sizes.M[1]} cm`;
      sizeLabelL.innerHTML = `Large<br>${sizes.L[0]} × ${sizes.L[1]} cm`;

      let printSize = document.querySelector('input[name="printSize"]:checked').value;
      let matWidth = document.getElementById("matWidthSlider").value;
      let frameWidth = document.getElementById("frameWidthSlider").value;
      let width = sizes[printSize][0] + (2 * matWidth) + (2 * frameWidth);
      let height = sizes[printSize][1] + (2 * matWidth) + (2* frameWidth);
      document.getElementById("total-size").innerHTML = `${width} × ${height} cm`;
    }

    

    

    

		cartLinkHelper.updateCartLink();
  