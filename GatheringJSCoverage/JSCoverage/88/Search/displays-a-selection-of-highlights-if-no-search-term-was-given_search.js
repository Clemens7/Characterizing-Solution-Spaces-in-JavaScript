//TODO: import highlights from json
//TODO: art-chaching
//TODO: link to corresponding frame-config

class Artwork {
  
}

var SearchTerms = {
  serialize : ,
  parse : 
}

async function useHighlights(){
  var highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
  var i = 0;
  for( i = 0; i < 12; i++){
    addGridElement(highlights[i], i);
  }
}









async function addGridElement(retrievedObject, nthObject){
  var url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"+retrievedObject;
  const response = await fetch(url);
  const data = await response.json();

  function processObjectRequest(){
      var thumb = document.createElement("div");
      thumb.setAttribute("class", "thumb");
      thumb.setAttribute("id", "thumb-"+nthObject);

      var aOfThumb = document.createElement("a");
      aOfThumb.setAttribute("href", ""); //TODO
      aOfThumb.setAttribute("id", "object-"+nthObject);

      var imgOfThumb = document.createElement("img");
      imgOfThumb.setAttribute("src", data.primaryImageSmall);
      imgOfThumb.setAttribute("alt", data.objectName);
      imgOfThumb.setAttribute("id", "object-image-"+nthObject);

      var labelOfThumb = document.createElement("div");
      labelOfThumb.setAttribute("class", "museum-label");

      var artist = document.createElement("span");
      artist.setAttribute("class", "artist");
      artist.setAttribute("id", "artist"+nthObject);

      artist.innerText = data.artistDisplayName;

      var title = document.createElement("span");
      title.setAttribute("class", "title");
      title.setAttribute("id", "title"+nthObject);

      title.innerText = data.title;

      var comma = document.createElement("text");
      comma.innerText = ", ";

      var date = document.createElement("span");
      date.setAttribute("class", "date");
      date.setAttribute("id", "date"+nthObject);

      date.innerText = data.objectDate;

      thumb.appendChild(aOfThumb);
      aOfThumb.appendChild(imgOfThumb);
      labelOfThumb.appendChild(artist);
      labelOfThumb.appendChild(title);
      labelOfThumb.appendChild(comma);
      labelOfThumb.appendChild(date);
      aOfThumb.appendChild(labelOfThumb);

      document.getElementById("gallery").appendChild(thumb);
    }

    processObjectRequest();
}
