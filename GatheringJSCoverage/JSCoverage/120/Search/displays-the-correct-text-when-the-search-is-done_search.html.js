
    import { Picture } from './picture.js';
    import * as PictureAPI from './picture-api.js';
    import * as PictureDOM from './picture-dom.js';
    import * as CartHelper from './cart.js';

    document.getElementById("cart-link").innerText = CartHelper.getCartString();

    let searchParam = (new URLSearchParams(window.location.search)).get('q');
    let searchInfoText = document.getElementById('search-info');

    if (searchParam) {
      searchInfoText.innerText = `Searching for “${searchParam}”...`;
    }

    let pictureSearch = PictureAPI.search_pictures(searchParam).then((response) => {
      if (response['total'] <= 0) return 0;});

    if (searchParam) {
      pictureSearch.then((total) => {
          searchInfoText.innerText = `Found ${total} ${pluralize("artwork", total)} for “${searchParam}”`;
        }
      );
    }

    function pluralize(word, amount) {
      if (amount === 1) 

      return word + "s";
    }
  