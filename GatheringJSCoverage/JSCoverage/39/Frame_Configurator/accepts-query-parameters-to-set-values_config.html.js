

    window.addEventListener("load", function () {

      //this if statement checks whether the cart item is defined, if yes, then it updates the number of cart items
      if (JSON.parse(localStorage.getItem("cart")) != null ) 
    });

    import * as Frame from './frame.js';

    var urlParams = new URLSearchParams(window.location.search);
    var objectID = urlParams.get('objectID');
    var printSize = urlParams.get('printSize');
    var frameStyle = urlParams.get('frameStyle');
    var frameWidth = urlParams.get('frameWidth');
    var matColor = urlParams.get('matColor');
    var matWidth = urlParams.get('matWidth');

    var requests = [];

    if(objectID === null)else{
      requests.push(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID))

      Promise.all(requests)
              .then(function (responses) {
                return responses.map(function (response) {
                  return response.json();
                });
              }).then(function (data) {
        for(var element in data){
          console.log(data);
          data[element].then(function (result){
            console.log(result);
            if(result.message === "ObjectID not found"||result.message === "could not parse objectID")else{
              makePicturewithTitle(result);
            }
          });
        }
      }).catch();
    }


    //Show picture with title
    function makePicturewithTitle(data) {
      var artist;
      var title;
      var objectDate;

      if(data.artistDisplayName !== null){
        artist = data.artistDisplayName + "\n"
      }
      if(data.title !== null){
        title = data.title + ", "
      }
      if(data.objectDate !== null){
        objectDate = data.objectDate
      }

      var label = artist + title + objectDate;
      document.getElementById("image-label").innerText = label;
      document.getElementById("preview-image").setAttribute("src", data.primaryImageSmall);
    }

    //If values in query is give then change inputs
    if(printSize !== null){
      document.getElementById("print-size-" + printSize.toLowerCase()).checked=true;
    }
    if(frameStyle !== null){
      document.getElementById("frame-style-" + frameStyle.toLowerCase()).checked=true;
    }
    if(frameWidth !== null){
      document.getElementById("framewidthnumber").value = frameWidth/10;
      document.getElementById("framewidthrange").value = frameWidth/10;
    }
    if(matColor !== null){
      document.getElementById("mat-color-" + matColor.toLowerCase()).checked=true;
    }
    if(matWidth !== null){
      document.getElementById("matwidthnumber").value = matWidth/10;
      document.getElementById("matwidthrange").value = matWidth/10;
    }

    //Eventlistener to range inputs + validation
    document.getElementById("framewidthnumber").addEventListener("change", );

    document.getElementById("framewidthrange").addEventListener("change", );

    document.getElementById("matwidthnumber").addEventListener("change", );

    document.getElementById("matwidthrange").addEventListener("change", );

    document.getElementById("sizes").addEventListener("change", )

    document.getElementById("sizes").addEventListener("change", )

    document.getElementById("sizes").addEventListener("change", )

    document.getElementById("framestyle").addEventListener("change", )

    document.getElementById("matcolor").addEventListener("change", )


    function renderPictureAndPriceAndSize() {
      var sizes = Frame.getPrintSizes(document.getElementById("preview-image"));

      document.getElementById("print-size-s-label").innerText = "Small" + "\n" + sizes.S[0]/10 + " x " + sizes.S[1]/10 + " cm"
      document.getElementById("print-size-m-label").innerText = "Medium" + "\n" + sizes.M[0]/10 + " x " + sizes.M[1]/10 + " cm"
      document.getElementById("print-size-l-label").innerText = "Large" + "\n" + sizes.L[0]/10 + " x " + sizes.L[1]/10 + " cm"

      Frame.render(document.getElementById("preview-image"), //Image Object
                   document.getElementById("preview-container"), //Container Object
                   document.querySelector('input[name="printSize"]:checked').value,  //Image Size - Radiobutton
                   document.querySelector('input[name="frameStyle"]:checked').value,  //Frame Style - Radiobutton
                   document.getElementById("framewidthrange").value, //Frame Width
                   document.querySelector('input[name="matColor"]:checked').value,  //Mat Color - Radiobutton
                   document.getElementById("matwidthrange").value  //Mat Width
      )

      var price = Frame.calculatePrice(
              document.querySelector('input[name="printSize"]:checked').value, //Image Size - Radiobutton
              document.querySelector('input[name="frameStyle"]:checked').value,  //Frame Style - Radiobutton
              document.getElementById("framewidthrange").value*10, //Frame Width
              document.getElementById("matwidthrange").value*10  //Mat Width
      )

      document.getElementById("price").innerText = "€ " + price;

      var totalheight = 0;
      var totalwidth = 0;

      if(document.querySelector('input[name="printSize"]:checked').value === 'S')else if(document.querySelector('input[name="printSize"]:checked').value === 'M'){
        totalwidth = sizes.M[0]/10;
        totalheight = sizes.M[1]/10;
      }

      totalwidth += ((document.getElementById("framewidthrange").value * 2) + (document.getElementById("matwidthrange").value * 2));
      totalheight += ((document.getElementById("framewidthrange").value * 2) + (document.getElementById("matwidthrange").value * 2));

      totalwidth = Math.round((totalwidth + Number.EPSILON) * 10) / 10;
      totalheight = Math.round((totalheight + Number.EPSILON) * 10) / 10;

      document.getElementById("total-size").innerText = totalwidth + " x " + totalheight + " cm";

    }

    document.getElementById("preview-image").addEventListener("load", function () {
      renderPictureAndPriceAndSize();
    })

    document.getElementById("config-form").addEventListener("submit", )


  