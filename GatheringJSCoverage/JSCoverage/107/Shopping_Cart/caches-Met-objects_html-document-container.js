export class artDocumentContainer {
  constructor(containerID = 'gallery') {
      this.container = document.getElementById(containerID);
      if (!this.container) 
  }
  clear() {
      this.container.innerHTML = '';
  }





  
  


  addCartToDocument(artElem, id , data) {
      this.container.innerHTML += `
      <div class="cart-item">
      <div class="cart-preview" id="${id}">
      <a href="config.html?objectID=${artElem.objectID}&printSize=${data.printSize}&frameStyle=${data.frameStyle}&frameWidth=${data.frameWidth}&matColor=${data.matColor}&matWidth=${data.matWidth}">
          <img class="cart-thumb" src="${artElem.primaryImageSmall}" id="img${id}" alt="${artElem.title}">
        </a>
      </div>
      <div class="museum-label">
        <div>
        <span class="artist">${artElem.artistDisplayName}</span>
        <span class="title">${artElem.title}</span>,
        <span class="date">${artElem.objectDate}</span>
          <br><br>
          <span class="frame-description" id ="frame-desc-${id}"></span>
        </div>
        <div class="cart-price" id ="cartprice">€ <span id="price-${id}">0</span></div>
        <button type = "submit" class="cart-remove" name="cart-remove" id="cart-remove-${id}"></button>
      </div>
    </div>`;

  }

  addLastCartToDocument(artElem, id , data) {
    this.container.innerHTML += `
    <div class="cart-item">
    <div class="cart-preview" id="${id}">
    <a href="config.html?objectID=${artElem.objectID}&printSize=${data.printSize}&frameStyle=${data.frameStyle}&frameWidth=${data.frameWidth}&matColor=${data.matColor}&matWidth=${data.matWidth}">
        <img class="cart-thumb" src="${artElem.primaryImageSmall}" id="img${id}" alt="${artElem.title}">
      </a>
    </div>
    <div class="museum-label">
      <div>
      <span class="artist">${artElem.artistDisplayName}</span>
      <span class="title">${artElem.title}</span>,
      <span class="date">${artElem.objectDate}</span>
        <br><br>
        <span class="frame-description" id ="frame-desc-${id}"></span>
      </div>
      <div class="cart-price" id ="cartprice">€ <span id="price-${id}">0</span></div>
      <button type = "submit" class="cart-remove" name="cart-remove" id="cart-remove-${id}"></button>
    </div>
  </div>
  <div class="cart-total">
    <div class="price" id="priceT">Total: € <span id="price-total">0</span></div>
    <button type="button" id="checkout-button">Checkout</button>
  </div>
`;

}
}


export 