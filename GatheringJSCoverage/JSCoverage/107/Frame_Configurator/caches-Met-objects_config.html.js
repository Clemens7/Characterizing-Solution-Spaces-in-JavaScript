
      import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';
      import { getPrintSizes, render, calculatePrice } from './frame.js';
      import { countCartItems } from './display-cart-number.js';
      import { store, retrieveFromStorage } from './art-cache.js';

      let previewImageContainer = new artDocumentContainer('preview-container');
      countCartItems();
      document.addEventListener('DOMContentLoaded', event => {
        const params = (new URL(document.location)).searchParams;
        setQueries(params);
        setConfigImage(params);
      });

      async function setConfigImage(params) {
        if (!params.get('objectID')) 
        let doesObjectExist = JSON.parse(localStorage.getItem(params.get('objectID')));

        if(doesObjectExist){
          previewImageContainer.addPreviewToDocument(doesObjectExist);
          render(document.getElementById("preview-image"), document.getElementById("preview-container"), printSizeVar,
            frameStyleVar, frameWidth, matColorVar, matWidth);
          calculateToDoc(printSizeVar, frameStyleVar, frameWidth, matWidth);
          setPrintCms();

        }
      }
      function setQueries(params) {
        document.getElementById("object-id").value = params.get('objectID');

        if(params.get('printSize')) else {
          setPrintSizeQuery('M');
        }
        if(params.get('frameStyle')) else {
        setFrameStyleQuery("natural");
        }
        if(params.get('matColor')) else {
        setMatColorQuery("mint");
        }
        if(params.get('frameWidth')) else {
        setFrameWidthQuery('40');
        }
        if(params.get('matWidth')) else {
        setMatWidthQuery('55');
        }

      }

      function setPrintCms() {
        let printCms = getPrintSizes(document.getElementById("preview-image"));
        console.log(printCms);
        console.log("selam");

        (Math.round(((printCms.S[1] / 10) +  2 * (matWidth/10) + 2 * (frameWidth/10) + Number.EPSILON) * 100) / 100)
        if (printSizeVar == 'S')  else if (printSizeVar == 'M') {
          document.getElementById("total-size").innerHTML =
           `${(Math.round(((printCms.M[0] / 10) +  2 * (matWidth/10) + 2 * (frameWidth/10) + Number.EPSILON) * 100) / 100)} 
            ?? ${(Math.round(((printCms.M[1] / 10) +  2 * (matWidth/10) + 2 * (frameWidth/10) + Number.EPSILON) * 100) / 100)}  cm`;
        }

        document.getElementById("print-size-s-label").innerHTML = `Small<br>${printCms.S[0] / 10} ?? ${printCms.S[1] / 10} cm`;
        document.getElementById("print-size-m-label").innerHTML = `Medium<br>${printCms.M[0] / 10} ?? ${printCms.M[1] / 10} cm`;
        document.getElementById("print-size-l-label").innerHTML = `Large<br>${printCms.L[0] / 10} ?? ${printCms.L[1] / 10} cm`;

      }

      function setFrameWidthQuery(frameWidthQ) {
        frameWidthQ = Math.round(frameWidthQ);
        if (frameWidthQ < 20)  else if (frameWidthQ > 50)  else {
          document.getElementById("frameValue").value = frameWidthQ / 10;
          document.getElementById("frameValueR").value = frameWidthQ / 10;
        }
        frameWidth = frameWidthQ;
      }



      function setMatWidthQuery(matWidthQ) {
        matWidthQ = Math.round(matWidthQ);


        if (matWidthQ < 0)  else if (matWidthQ > 100)  else {
          document.getElementById("matValue").value = matWidthQ / 10;
          document.getElementById("matValueR").value = matWidthQ / 10;
        }
        matWidth = matWidthQ;

      }


      function setMatColorQuery(matColorQ) {
        if (matColorQ == 'ivory')  else if (matColorQ == 'mint') {
          document.getElementById('mat-color-mint').checked = true;
          matColorVar = 'mint';
        }
      }
      function setFrameStyleQuery(frameStyleQ) {
        if (frameStyleQ == 'classic')  else if (frameStyleQ == 'natural') {
          document.getElementById("frame-style-natural").checked = true;
          frameStyleVar = 'natural';
        }
      }

      function setPrintSizeQuery(printSizeQ) {
        if (printSizeQ == 'S')  else if (printSizeQ == 'M') {
          document.getElementById('print-size-m').checked = true;
          printSizeVar = 'M';
        }
      }
      

      let printSizeVar;
      let frameStyleVar;
      let matColorVar;
      let frameWidth;
      let matWidth;

      let printSizeElems = document.getElementsByName("printSize");
      printSizeElems.forEach(item => {
        item.addEventListener("input", );
      });

      let frameStyles = document.getElementsByName("frameStyle");
      frameStyles.forEach(item => {
        item.addEventListener("input", );
      });

      let matColors = document.getElementsByName("matColor");
      matColors.forEach(item => {
        item.addEventListener("input", );
      });

      let frameWidthV = document.getElementById("frameValue");
      let frameWidthR = document.getElementById("frameValueR");
      let matWidthV = document.getElementById("matValue");
      let matWidthR = document.getElementById("matValueR");
      matWidthV.addEventListener("change", );
      matWidthR.addEventListener("change", );
      

      frameWidthV.addEventListener("change", );
      frameWidthR.addEventListener("change", );
      

      function calculateToDoc(printSizeVar, frameStyleVar, frameWidth, matWidth) {

        document.getElementById("price").innerHTML = `??? ${calculatePrice(printSizeVar, frameStyleVar, frameWidth, matWidth).toFixed(2)}`;
      }

      window.addEventListener("submit", );

        

    class CartItem {
        

      }
     
      


    