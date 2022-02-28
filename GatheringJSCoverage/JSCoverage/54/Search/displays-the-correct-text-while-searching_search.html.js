
    import * as Common from './common.js';

    Common.setCartItemNumber();
    document.getElementById('search-button').addEventListener("click", searchClick);

    var q = getParameterByName('q');
    if (q !== null && q !== "" && q !== undefined) {
      search(q);
    }

    

    function search(query) {

      let searchInfo = document.getElementById("search-info");
      searchInfo.textContent = `Searching for “${query}”...`;

      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=${query}`)
        .then((response) => response.json())
        .then((data) => {

          if (data.total == 1)  else {
            searchInfo.textContent = `Found ${data.total} artworks for “${query}”`;
          }

          if (data.total > 0) {
            length = 0;
            if (data.total > 100)  else {
              length = data.total
            }
          }

          getCars(data.objectIDs, length)

        })
        .catch();
    }

    

    function getCars(idList, length) {
      for (let i = 0; i < length; ++i) {

        let item = localStorage.getItem("met" + idList[i]);

        if (item !== null)  else {
          fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + idList[i])
            .then((response) => response.json())
            .then((data) => {
              let artist = data.artistDisplayName;
              let title = data.title + ", ";
              let date = data.objectDate;
              let imgUrl = data.primaryImageSmall;

              localStorage.setItem("met" + idList[i], artist + ";" + title + ";" + date + ";" + imgUrl);

              addImage(idList[i], artist, title, date, imgUrl);
            });
        }
      }
    }

    function addImage(objectID, artist, title, date, imgUrl) {
      var gallery = document.querySelector("section#gallery");

      let newArtwork = document.createElement("div");
      let newA = document.createElement("a");
      let newImg = document.createElement("img");
      let newDiv = document.createElement("div");
      let newArtist = document.createElement("span");
      let newTitle = document.createElement("span");
      let newDate = document.createElement("span");

      newArtwork.classList.add("thumb");

      newA.href = `/config.html?objectID=${objectID}`;
      newA.id = `object-${objectID}`;

      newImg.src = imgUrl;
      newImg.alt = "";
      newImg.id = `object-image-${objectID}`;

      newDiv.classList.add("museum-label");

      newArtist.classList.add("artist");
      newArtist.textContent = artist;
      newTitle.classList.add("title");
      newTitle.textContent = title;
      newDate.classList.add("date");
      newDate.textContent = date;

      newDiv.appendChild(newArtist);
      newDiv.appendChild(newTitle);
      newDiv.appendChild(newDate);

      newA.appendChild(newImg);
      newA.appendChild(newDiv);

      newArtwork.appendChild(newA);
      gallery.appendChild(newArtwork);
    }

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) 
      if (!results[2]) 
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

  