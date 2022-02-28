
    import { Picture } from './picture.js';
    import * as PictureAPI from './picture-api.js';
    import * as PictureDOM from './picture-dom.js';
    import * as CartHelper from './cart.js';

    document.getElementById("cart-link").innerText = CartHelper.getCartString();

    let searchParam = (new URLSearchParams(window.location.search)).get('q');
    let searchInfoText = document.getElementById('search-info');

    if (searchParam) 

    let pictureSearch = PictureAPI.search_pictures(searchParam).then((response) => {
      if (response['total'] <= 0) 

      response['objectIDs'].forEach(objectID => {
        PictureAPI.retrieve_picture(objectID).then((picture) => {
          document.getElementById("gallery").appendChild(
            PictureDOM.createThumbnail(picture)
          )
        });
      });

      return response.total;
    });

    if (searchParam) 

    
  