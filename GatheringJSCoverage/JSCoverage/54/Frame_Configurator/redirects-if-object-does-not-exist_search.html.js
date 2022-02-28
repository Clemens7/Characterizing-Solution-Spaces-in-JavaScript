
    import * as Common from './common.js';

    Common.setCartItemNumber();
    document.getElementById('search-button').addEventListener("click", searchClick);

    var q = getParameterByName('q');
    if (q !== null )  else {
      showHighlights();
    }

    

    

    function showHighlights() {
      fetch('./highlights.json')
        .then()
        .then()
        .catch();
    }

    

    

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;}

  