window.onload = getPageContent();

function qplusser(q){
    return q.split(' ').join('+');
}




async function getPageContent() {

    //this if statement checks whether the cart item is defined, if yes, then it updates the number of cart items
    if (JSON.parse(localStorage.getItem("cart")) != null ) 

    var urlParams = new URLSearchParams(window.location.search);
    var q = urlParams.get('q');

    var IDs;
    var resultIDs;
    var count = 0;
    var requests = [];

    if(q===null||q===""||q===undefined) else{
        document.getElementById("search-info").innerHTML = 'Searching for “' + q + '”...';
        resultIDs = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=' +qplusser(q)+'&hasImages=true');
        IDs = await resultIDs.json();
    }}

