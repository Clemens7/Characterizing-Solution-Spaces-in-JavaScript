window.onload = getPageContent();






async function getPageContent() {

    //this if statement checks whether the cart item is defined, if yes, then it updates the number of cart items
    if (JSON.parse(localStorage.getItem("cart")) != null ) 

    var urlParams = new URLSearchParams(window.location.search);
    var q = urlParams.get('q');

    var IDs;
    var resultIDs;
    var count = 0;
    var requests = [];

    if(q===null){
        fetch('highlights.json')
        .then(res => res.json())
        .then(data => {
            IDs=data;
            for (var key in IDs.highlights) {
                requests.push(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + IDs.highlights[key]));
                //count to break after 100 images have been reached
                count = count + 1;
                if (count==100)
            }
            Promise.all(requests)
            .then(function (responses) {
                return responses.map(function (response) {
                    return response.json();
                });
            }).then(function (data) {
                for(var element in data){
                    data[element].then(function (result){
                        createHTMLElements(result);
                    });
                }
                if(q===null){}
            }).catch();
        })
        .catch();
    }


    Promise.all(requests)
        .then(function (responses) {
            return responses.map();
        }).then(function (data) {
            for(var element in data)
            if(q===null){}
        }).catch();
}

function createHTMLElements(data){
    //createElements
    var divThumb = document.createElement('div');
    var a = document.createElement('a');
    var img = document.createElement('img');
    var divSpans = document.createElement('div');
    var spanArtist = document.createElement('span');
    var spanTitle = document.createElement('span');
    var spanDate = document.createElement('span');

    //setElementAttributes
    divThumb.setAttribute("class", "thumb");
    a.setAttribute("href", "config.html?objectID="+data.objectID);
    a.setAttribute("id", "object-" + data.objectID);
    img.setAttribute("src", data.primaryImageSmall);
    img.setAttribute("alt", "");
    img.setAttribute("id", "object-image-" + data.objectID);
    divSpans.setAttribute("class", "museum-label");
    spanArtist.setAttribute("class", "artist");
    spanTitle.setAttribute("class", "title");
    spanDate.setAttribute("class", "date");

    //setElementValues
    if(data.artistDisplayName===null) else {
        spanArtist.innerHTML = data.artistDisplayName;
    }
    if(data.title===null) else{
        spanTitle.innerHTML = data.title + ", ";
    }    
    if(data.objectDate===null) else{
        spanDate.innerHTML = data.objectDate;
    }

    //connectAndSortElements
    divSpans.appendChild(spanArtist);
    divSpans.appendChild(spanTitle);
    divSpans.appendChild(spanDate);
    a.appendChild(img);
    a.appendChild(divSpans);
    divThumb.appendChild(a);
    document.getElementById("gallery").appendChild(divThumb);
}