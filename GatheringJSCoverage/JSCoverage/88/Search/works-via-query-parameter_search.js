//TODO: import highlights from json
//TODO: art-chaching
//TODO: link to corresponding frame-config

class Artwork {
  
}

var SearchTerms = {
  serialize : ,
  parse : function(searchTermString){
    return searchTermString.split(",");
  }
}





async function getObjectsIDs(searchValue){
  let url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";
  const arraySearchValues = SearchTerms.parse(searchValue);
  let arrayWithFoundObjectIds = [];

  document.getElementById("search-info").innerHTML = "Searching for &ldquo;"+searchValue+"&rdquo;"+"...";

  //May use here promise all
  let i = 0;
  for(tmpValue of arraySearchValues){
    arrayWithFoundObjectIds.push((await fetchObject(url, tmpValue)).objectIDs);
  }

  //shows the results of each searchValue
  /*arrayWithFoundObjectIds.map(function(currentValue) {
    console.log(currentValue);
  });*/

  // step 1: Find the shortest array
  //         (only the shortest has to be checked because the values have to be in all arrays)
  let lengthArray = [];
  let oneArrayDoesNotExist = false;
  for(tmp of arrayWithFoundObjectIds){
    if(tmp == null)
    lengthArray.push(tmp.length);
  }

  let results = 0;
  let foundObjects = [];
  if(!oneArrayDoesNotExist){
    const shortestLengthIndex = Math.min.apply(Math, lengthArray);
    //         get the index of the first array with shortestLengthIndex
    let index = 0;
    for(index = 0; index < arrayWithFoundObjectIds; index++)

    // step 2: Check if its values are contained in the ohters
    //         if that is true add it to foundObjects array
    //         the first two arrays get compared and the same values stored in foundObjects
    //         after that foundObjects get compared with the next array and so on
    foundObjects = arrayWithFoundObjectIds[index];
    for(tmpArray of arrayWithFoundObjectIds){ //loops throgh the shortest array
      if(tmpArray != arrayWithFoundObjectIds[index])
    }

    //console.log(foundObjects);
    results = foundObjects.length;
  }

  function processRequest(){
    //clears the recent search
    document.getElementById("gallery").innerHTML="";

    if(results > 1){
      document.getElementById("search-info").innerHTML = "Found "+results+" artworks for &ldquo;"+searchValue+"&rdquo;";
    }

    var i = 0;
    //loops through the objects and shows the first 100 with pics
    for( i = 0; i < (results <= 100 ? results ); i++){
        addGridElement(foundObjects[i], i);
    }
  }
  processRequest();
}



async function fetchObject(url, query){
  const response = await fetch(url+query);
  const data = await response.json();
  return data;
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
