
    import * as CartCache from '/cart-cache.js';
    import * as ArtworkCache from '/artwork-cache.js';
    import * as SearchAPI from '/search-api.js';
    import * as Frame from '/frame.js';

    const cartCache = CartCache.retrieve();

    document.addEventListener('DOMContentLoaded', event => {

    //CartCache.store(39799, 'S', "shabby", 20, "indigo", 0);


    
    const cart = document.getElementById('cart-link');
    if(cartCache){
        cart.innerHTML = `Cart (${cartCache.length})`;

    }

    for(let i = 0; i < cartCache.length; i++){
      displayArt(cartCache[i]);
    }

  });


  async function displayArt(item){
     let artwork = ArtworkCache.retrieve(item.objectID);
     if(!artwork){
          artwork = await getArtwork(item.objectID);
          ArtworkCache.store(item.objectID, artwork);
      }

    const section = document.getElementById('cart');


    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    section.prepend(cartItem);

    const cartPreview = document.createElement('div');
    cartPreview.classList.add('cart-preview');
    //cartPreview.id = "preview-container-0"
    cartItem.appendChild(cartPreview);

    const link = document.createElement('a');
    const configString = "&printSize=" + item.printSize + "&frameStyle=" + item.frameStyle + "&frameWidth=" + item.frameWidth + "&matColor=" + item.matColor + "&matWidth=" + item.matWidth;
    link.href = "/config.html?" + "objectID=" + item.objectID + configString;
    cartPreview.appendChild(link);
    const image = document.createElement('img');
    image.src = artwork.image;
    image.classList.add('cart-thumb');
    //image.id = "preview-0";
    image.alt = artwork.altText;
    Frame.render(image, cartPreview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    link.appendChild(image);

    const museumLabel = document.createElement('div');
    museumLabel.classList.add('museum-label');
    cartItem.appendChild(museumLabel);
    const div = document.createElement('div');
    museumLabel.appendChild(div);
    const artist = document.createElement('span');
    artist.classList.add("artist");
    artist.innerHTML = artwork.artist;
    div.appendChild(artist);
    const title = document.createElement('span');
    title.classList.add("title");
    title.innerHTML = artwork.title;
    div.appendChild(title);
    const date = document.createElement('span');
    date.classList.add("date");
    date.innerHTML = ", " + artwork.date;
    div.appendChild(date);
    const br = document.createElement('br');
    const br2 = document.createElement('br');
    div.appendChild(br);
    div.appendChild(br2);

    //const cartPrice = document.createElement('div');
    //cartPrice.classList.add('cart-price')
    const frameDesc = document.createElement('span');
    frameDesc.classList.add('frame-description');

    let description = "";
    let printSizeText = "";
    let matWidthText = ".";
    let addText1 = "";
    let addText2 = "";
    if(item.matWidth%10 != 0){
      addText1 = "." + item.matWidth%10;
    }
    if(item.frameWidth%10 != 0){
      addText2 = "." + item.frameWidth%10;
    }
    if(item.printSize == 'S'){
      printSizeText = "Small";
    } else if(item.printSize == 'M'){
      printSizeText = "Medium";
    }

    if(item.matWidth != 0){
      matWidthText = " with a " + item.matWidth.toString().charAt(0) + addText1  + " cm " + item.matColor + " mat.";
    }

    description = printSizeText + " print in a " + item.frameWidth.toString().charAt(0) + addText2 + " cm " + item.frameStyle + " frame" + matWidthText;
    console.log(description);
    frameDesc.innerHTML = description;
    div.appendChild(frameDesc);
    const cartRemove = document.createElement('button');
    cartRemove.classList.add('cart-remove');
    museumLabel.appendChild(cartRemove)


  }



  async function getArtwork(objectID){
    let artwork = await SearchAPI.retrieveArt(objectID);
    return artwork;
  }
  