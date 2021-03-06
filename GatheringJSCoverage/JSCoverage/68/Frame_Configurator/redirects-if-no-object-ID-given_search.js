const URL = 'https://collectionapi.metmuseum.org';
const SEARCH_API = '/public/collection/v1/search';
const GET_OBJECT_API = '/public/collection/v1/objects';
const CONFIG_SIDE = "/config.html";
const SEARCH_SIDE = "/search.html";
let SERVER_URL;
const CURRENT_URL = window.location.href;

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');

let foundPictureAmount = 0;
let searchTerm = "";
let urlHasParam = false;

class Image {
    static HtmlNumber = 0;
    constructor(id, title, artist, date, link, src) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.link = link;
        this.src = src;
        this.htmlNumber = Image.HtmlNumber++;
    }

    static fillObjectFromImageResponse(responsePicture) {
        let image = new Image();
        image.id = responsePicture.objectID;
        image.title = responsePicture.title;
        image.artist = responsePicture.artistDisplayName;
        image.date = responsePicture.objectDate;
        if (urlHasParam) {
            image.link = SERVER_URL + CONFIG_SIDE + "?objectID=" + responsePicture.objectID;
        }
        image.src = responsePicture.primaryImageSmall;
        return image;
    }


    static generateHTMLImage (image) {
        const outerContainer = document.createElement('div');
        outerContainer.className = "thumb";
        const thumbnailUrlContainer = document.createElement('a');
        thumbnailUrlContainer.href = image.link;
        thumbnailUrlContainer.id = "object-" + image.id;

        const img = document.createElement('img');
        img.src = image.src;

        const innerContainer = document.createElement('div');
        innerContainer.className = 'museum-label';
        const imgArtist = document.createElement('span');
        imgArtist.innerText = image.artist;
        imgArtist.className = "artist";
        const imgTitle = document.createElement('span');
        imgTitle.innerText = image.title + ', ';
        imgTitle.className = "title";
        const imgDate = document.createElement('span');
        imgDate.innerText = image.date;
        imgDate.className = "date";

        outerContainer.appendChild(thumbnailUrlContainer);
        thumbnailUrlContainer.appendChild(img);
        thumbnailUrlContainer.appendChild(innerContainer);

        innerContainer.appendChild(imgArtist);
        innerContainer.appendChild(imgTitle);
        innerContainer.appendChild(imgDate);

        return outerContainer;
    }
}

async function getRequest(url, callback, callbackObject) {
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        callback(rawData, callbackObject);
        return rawData;
    }}



function getPictureObjectSuccessCallback(response, localStorageKey) {
    let image = Image.fillObjectFromImageResponse(response);
    if (localStorageKey) 
    let htmlImage = Image.generateHTMLImage(image);
    gallery.appendChild(htmlImage);
}



function init() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null )  else {
        document.getElementById('cart-link').innerHTML = "Cart (0)";
    }

    let newUrl = window.location.href;
    if (newUrl.indexOf('?') !== -1) 
    SERVER_URL = newUrl.substring(0, newUrl.length - SEARCH_SIDE.length);


    let url = URL + SEARCH_API + '?hasImages=true';
    let q;
    /* const form = document.querySelector('form.search-form');--- urspr??ngliche version inclusive versuche um fragw??rdige Tests zu satisfyen
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (searchInput.value) {
                searchInput.style.border = '0px';
                searchTerm = searchInput.value.replace("+", " ");
                searchInfo.innerHTML = 'Searching for ???' + searchTerm + '???...';
                getRequest(urlRequest + '&q=' + searchTerm, doNothing).then(
                    (response) => {
                        getSearchIDsSuccessCallback(response);
                        //debugger;
                        //return response.objectIDs;
                    })
            } else {
                searchInput.style.border = '1px solid red';
            }
        });*/

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlHasParam.toString() !== "") {
        urlHasParam = true;
    }
    if (urlParams.has('q')) 

    if (queryString !== '' )  else {
        foundPictureAmount = 12;
        let defaultPics =  [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105]

        for (let i = 0; i < defaultPics.length && i < 100; i++) {
            let urlRequest = URL + GET_OBJECT_API + '/' + defaultPics[i];

            getRequest(urlRequest, getPictureObjectSuccessCallback);
        }
    }
}

init();