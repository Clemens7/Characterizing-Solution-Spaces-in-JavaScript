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
    

    static 


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







function loadLocalStorageImages(key) {
    let pictures = localStorage["search:"+key].split(';;;');

    if (pictures.length <= 1)  else {
        searchInfo.innerHTML = 'Found ' + pictures.length + ' artworks for “' + searchTerm + '”';
    }

    for (let i = 0; i < pictures.length; i++) {
        const image = JSON.parse(pictures[i]);
        const htmlImage = Image.generateHTMLImage(image);
        gallery.appendChild(htmlImage);
    }}

function init() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null )  else {
        document.getElementById('cart-link').innerHTML = "Cart (0)";
    }

    let newUrl = window.location.href;
    if (newUrl.indexOf('?') !== -1) {
        newUrl = newUrl.substring(0, newUrl.indexOf('?'));
    }
    SERVER_URL = newUrl.substring(0, newUrl.length - SEARCH_SIDE.length);


    let url = URL + SEARCH_API + '?hasImages=true';
    let q;
    /* const form = document.querySelector('form.search-form');--- ursprüngliche version inclusive versuche um fragwürdige Tests zu satisfyen
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (searchInput.value) {
                searchInput.style.border = '0px';
                searchTerm = searchInput.value.replace("+", " ");
                searchInfo.innerHTML = 'Searching for “' + searchTerm + '”...';
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
    if (urlParams.has('q')) {
        q = urlParams.get('q');
    }

    if (queryString !== '' && q != null && q !== '') {
        console.log('search with "' + q + '" as parameter');
        searchTerm = q;

        searchInfo.innerHTML = 'Searching for “' + searchTerm + '”...';

        const currentUrlRequest = url +'&' + 'q=' + q;

        if (localStorage["search:"+q] && localStorage["search:"+q] !== "") {
            loadLocalStorageImages(q);
        }
    }
}

init();