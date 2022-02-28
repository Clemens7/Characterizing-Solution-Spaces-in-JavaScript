

      import {render, calculatePrice} from "./frame.js";

      const cartLink = document.getElementById("cart-link");
      const objectAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
      const frameWidthInput = document.getElementsByName("frameWidth")[0];
      const frameWidthSlider = document.getElementsByName("frameWidthR")[0];
      const matWidthInput = document.getElementsByName("matWidth")[0];
      const matWidthSlider = document.getElementsByName("matWidthR")[0];
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const imgLabel = document.getElementById("image-label");
      const printSizes = document.getElementById("print-sizes");
      const price = document.getElementById("price");
      const sLabel = document.getElementById("print-size-s-label");
      const mLabel = document.getElementById("print-size-m-label");
      const lLabel = document.getElementById("print-size-l-label");

      const frameStyles = document.getElementsByName("frameStyle");

      const matColors = document.getElementsByName("matColor");

      const addToCart = document.getElementById("add-cart");

      addToCart.addEventListener('click', );

      matColors.forEach(matColor=>{matColor.addEventListener('change', )});

      frameStyles.forEach(frameStyle=>{frameStyle.addEventListener('change', )});

      printSizes.addEventListener('change', );

      frameWidthInput.addEventListener('change', );

      frameWidthSlider.addEventListener('change', );

      matWidthInput.addEventListener('change', );

      matWidthSlider.addEventListener('change', );


      async function getImageObject(imgID) {
          let picture = JSON.parse(localStorage.getItem(imgID));
          if (!picture) {
              let response = await fetch(objectAPI + imgID);
              picture = await response.json();

              localStorage.setItem(imgID, JSON.stringify(picture));
          }
          return picture;
      }

      document.addEventListener('DOMContentLoaded', async event => {

          console.log(parseFloat((0.3551).toFixed(1)));

          const cart = localStorage.getItem('cart');
          if (!cart) {
              cartLink.innerText = "Cart";
          }

          if(getParameterByName("objectID")==null)

          const img = await getImageObject(getParameterByName("objectID"));
          const picture = img.primaryImageSmall;


          if (picture) {
              if (getParameterByName("printSize")) {
                  document.getElementById("print-size-"+getParameterByName("printSize").toLowerCase()).checked=true;
              }

              if (getParameterByName("frameStyle"))
                  document.getElementById("frame-style-"+getParameterByName("frameStyle").toLowerCase()).checked=true;

              if (getParameterByName("frameWidth")) {
                  let value = parseFloat(getParameterByName("frameWidth"))/10;
                  if(value<2)
                      
                  if(value>5)
                      
                  value = value.toFixed(1);
                  frameWidthInput.value = parseFloat(value);
                  frameWidthSlider.value = parseFloat(value);
              }

              if(getParameterByName("matColor"))
                  document.getElementById("mat-color-"+getParameterByName("matColor").toLowerCase()).checked=true;

              if(getParameterByName("matWidth")) {
                  let value = parseFloat(getParameterByName("matWidth"))/10;
                  if(value<0)
                      
                  if(value>10)
                      
                  value = value.toFixed(1);
                  matWidthInput.value = parseFloat(value);
                  matWidthSlider.value = parseFloat(value);
              }
              previewImage.setAttribute("src", picture);
              previewImage.addEventListener('load', );

              imgLabel.innerHTML = `
                    <span class="artist">${img.artistDisplayName}</span>
                    <span class="title">${img.title}</span>,
                    <span class="date">${img.objectDate}</span>`;

          }
      });

      

      function getParameterByName(name) {
          const url = window.location.href;
          name = name.replace(/[\[\]]/g, '\\$&');
          var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
          if (!results) 
          if (!results[2]) 
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }

      



  