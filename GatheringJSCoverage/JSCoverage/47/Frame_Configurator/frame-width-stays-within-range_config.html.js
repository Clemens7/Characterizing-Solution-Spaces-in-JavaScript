

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

      frameWidthInput.addEventListener('change', function(){
          if(frameWidthInput.value<2)
              frameWidthInput.value=2;
          if(frameWidthInput.value>5)
              frameWidthInput.value=5;
          frameWidthSlider.value = parseFloat(parseFloat(frameWidthInput.value).toFixed(1));
          frameWidthInput.value = parseFloat(parseFloat(frameWidthInput.value).toFixed(1));
          updateImage();
      });

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
              if (getParameterByName("printSize")) 

              if (getParameterByName("frameStyle"))
                  

              if (getParameterByName("frameWidth")) 

              if(getParameterByName("matColor"))
                  

              if(getParameterByName("matWidth")) 
              previewImage.setAttribute("src", picture);
              previewImage.addEventListener('load', ()=> {
                  updateImage();
              });

              imgLabel.innerHTML = `
                    <span class="artist">${img.artistDisplayName}</span>
                    <span class="title">${img.title}</span>,
                    <span class="date">${img.objectDate}</span>`;

          }
      });

      function updateImage(){
          render(previewImage, previewContainer, getCheckedRadio("printSize"), getCheckedRadio("frameStyle"), frameWidthInput.value*10, getCheckedRadio("matColor"), matWidthInput.value*10);
          price.innerText = "€ "+calculatePrice(getCheckedRadio("printSize"), getCheckedRadio("frameStyle"), frameWidthInput.value*10, matWidthInput.value*10).toFixed(2);
      }

      function getParameterByName(name) {
          const url = window.location.href;
          name = name.replace(/[\[\]]/g, '\\$&');
          var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) 
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }

      function getCheckedRadio(rbGroupName) {
          var rb = document.getElementsByName(rbGroupName);

          for (let i = 0; i < rb.length; i++) {
              if (rb[i].checked) {
                  return rb[i].value;
              }
          }}



  