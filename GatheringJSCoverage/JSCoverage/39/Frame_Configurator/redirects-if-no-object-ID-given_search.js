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
            .then().then().catch();
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

