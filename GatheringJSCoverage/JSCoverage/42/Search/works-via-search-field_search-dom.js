function createAndAppendResult(result) {
    var container = document.getElementById('gallery');
    console.log(container)
    if (!container) 
    var divNode = document.createElement("div")
    divNode.setAttribute('class', 'thumb')
    container.appendChild(divNode)
    divNode.setAttribute('class', 'thumb')
    var aNode = document.createElement("a");
    aNode.setAttribute('id', 'object-' + result.objectID);
    divNode.appendChild(aNode);
    var imgNode = document.createElement("img");
    imgNode.setAttribute('src', result.primaryImageSmall);
    imgNode.setAttribute('id', 'object-img-' + result.objectID);
    var linkNode = document.createElement("a");
    linkNode.setAttribute("href", 'config.html?object-id=' + result.objectID);
    linkNode.appendChild(imgNode);
    aNode.appendChild(linkNode);
    var innerDivNode = document.createElement("div");
    innerDivNode.setAttribute('class', 'museum-label');
    aNode.appendChild(innerDivNode);
    var span_1 = document.createElement("span");
    span_1.className = "artist";
    span_1.innerHTML = result.artistDisplayName;
    innerDivNode.appendChild(span_1)
    var span_2 = document.createElement("span");
    span_2.className = "title";
    span_2.innerHTML = result.title + ', ';
    innerDivNode.appendChild(span_2)
    var span_3 = document.createElement("span");
    span_3.className = "date";
    span_3.innerHTML = result.objectDate;
    innerDivNode.appendChild(span_3)


}

function modifySearchBar(text) {
    var bar = document.getElementById('search-info');
    bar.innerHTML = text;
}

function clear() {
    var container = document.getElementById('gallery');
    container.innerHTML = '';
}

function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";

}