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
    arrayWithFoundObjectIds.push((await fetchObject(url, tmpValue)}



async function fetchObject(url, query){
  const response = await fetch(url+query);}


