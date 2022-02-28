
    import { calculatePrice, render, getPrintSizes } from './frame.js'

    let objectID = null;
    let imgWidth = null;
    let imgHeight = null;

    let previewImage = document.getElementById("preview-image");
    let previewContainer = document.getElementById("preview-container");

    let submitForm = document.getElementById("config-form");
    submitForm.onsubmit = ;

    let frameWidthSlider = document.getElementById("frameWidthSlider");
    frameWidthSlider.onchange = ;
    let frameWidthText = document.getElementById("frameWidthText");
    frameWidthText.onchange = event => setFrameWidth(frameWidthText.value);

    let matWidthSlider = document.getElementById("matWidthSlider");
    matWidthSlider.onchange = ;
    let matWidthText = document.getElementById("matWidthText");
    matWidthText.onchange = ;

    let buttons = document.getElementsByName("printSize");
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].onclick = ;
    }
    buttons = document.getElementsByName("frameStyle");
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].onclick = ;
    }
    buttons = document.getElementsByName("matColor");
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].onclick = ;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('frameWidth')) 
    if (urlParams.get('matWidth')) 
    if (urlParams.get('printSize')) 
    if (urlParams.get('frameStyle')) 
    if (urlParams.get('matColor')) 
    if (urlParams.get('objectID')) {
      objectID = urlParams.get('objectID'); //localhost:63342/a2-group-76/www/config.html?objectID=25425
      console.log("given objectID: ", objectID);
      let cart = JSON.parse(window.localStorage.getItem('configcart'));
      let inConfigCache = false;
      if (cart) 
      if (!inConfigCache){
        loadPicture(objectID)
                .then( data => {
                  if (!data) 
                  console.log("data: ", data);
                  previewImage.src = data.primaryImageSmall;
                  updateDescription(data.title, data.artistDisplayName, data.objectDate);
                  console.log("previewImage.src: ", previewImage.src);
                  let printSizes = getPrintSizes(previewImage);
                  console.log("printSizes: ", printSizes);
                  let sLabel = document.getElementById("print-size-s-label");
                  sLabel.innerHTML = "Small<br>" + printSizes.S[0] +  "×" + printSizes.S[1] +  "cm";
                  let mLabel = document.getElementById("print-size-m-label");
                  mLabel.innerHTML = "Medium<br>" + printSizes.M[0] +  "×" + printSizes.M[1] +  "cm";
                  let lLabel = document.getElementById("print-size-l-label");
                  lLabel.innerHTML = "Large<br>" + printSizes.L[0] +  "×" + printSizes.L[1] +  "cm";
                  updatePreview();
                  let storage = window.localStorage;
                  let artWork = {
                    objectID: objectID,
                    printSize: getSelectedPrintSize(),
                    frameWidth: frameWidthSlider.value,
                    frameStyle: getSelectedFrameStyle(),
                    matWidth: matWidthSlider.value,
                    matColor: getSelectedMatColor(),
                    primaryImageSmall: data.primaryImageSmall,
                    title: data.title,
                    artistDisplayName: data.artistDisplayName,
                    objectDate: data.objectDate
                  };

                  if (!storage.getItem("configcart")) {
                    let artWorks = [ artWork ];
                    storage.setItem("configcart", JSON.stringify(artWorks));
                  }
                })
                .catch( );
      }
    }

    updatePrice();
    updateTotalSize();
    updateCart();

    function setFrameWidth(cm) {
      console.log("frame value changed to: ", cm);
      cm = parseFloat(cm);
      if (cm > 5.0)  else if (cm < 2.0) 
      cm = parseFloat(cm.toFixed(1));
      frameWidthText.value = cm;
      frameWidthSlider.value = cm;
      updatePrice();
      updateTotalSize();
      updatePreview();
    }

    

    

    async function loadPicture(id) {
      let req = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id;
      let resp = await fetch(req);
      let respJson = await resp.json();
      if (respJson.primaryImageSmall) {
        return respJson;
      }}

    function updatePrice() {
      let price = calculatePrice(getSelectedPrintSize(), getSelectedFrameStyle(), frameWidthSlider.value*10, matWidthSlider.value*10);
      let priceLabel = document.getElementById("price");
      priceLabel.innerHTML = "€ " + price.toFixed(2);
    }

    function updateTotalSize() {
      //TODO ??
    }

    function updateCart() {
      let storage = window.localStorage;
      if (storage.getItem("cart")) 
    }

    function updatePreview() {
      render(previewImage, previewContainer, getSelectedPrintSize(), getSelectedFrameStyle(),
              frameWidthSlider.value, getSelectedMatColor(), matWidthSlider.value);
    }

    function updateDescription(title, artistDisplayName, objectDate) {
      let priceLabel = document.getElementById("image-label");
      priceLabel.innerHTML = title + " " + artistDisplayName + " " + objectDate;
    }

    function getSelectedPrintSize() {
      let buttons = document.getElementsByName("printSize");
      for(let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
          return buttons[i].value;
        }
      }}
    function getSelectedFrameStyle() {
      let buttons = document.getElementsByName("frameStyle");
      for(let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
          return buttons[i].value;
        }
      }}
    function getSelectedMatColor() {
      let buttons = document.getElementsByName("matColor");
      for(let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
          return buttons[i].value;
        }
      }}
  