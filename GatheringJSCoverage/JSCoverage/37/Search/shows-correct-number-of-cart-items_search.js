async function performSearch() {
    //avoid '+' trap from test-case

    let search = document.getElementById("search");
    search.onchange = 

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    let updateTitle = !!query;
    let title = document.getElementById("search-info");

    if (updateTitle) 

    const searchResults = await fetchArtworks(query);
    const resultCount = searchResults.objectIDs.length;
    searchResults.objectIDs = searchResults.objectIDs.splice(0, 100); // discard all but 100 results

    if (updateTitle) 

    const gallery = document.getElementById("gallery");

    for (let objectID of searchResults.objectIDs) {
        fetchObject(objectID).then((object)=>gallery.appendChild(createObejctDOMElement(object)));
        // if we wanted to keep the order and load the images sequentially:
        // let object = await(fetchObject(objectID));
        // gallery.appendChild(createObejctDOMElement(object));
    }

    /* show number of items in cart */
	const cart = JSON.parse(localStorage.getItem("cart"));
	const itemCount = cart.length;
	if (itemCount < 1) {
		document.getElementById("cart-link").innerText = 'Cart';
	}
}

function getObjectURL(object) {
    return `config.html?objectID=${object.objectID}`;
}

function getArtistName(object) {
    return object.artistDisplayName; //object.constituents ? object.constituents[0].name : ""; //not all objects have an artist in the database
}


function createObejctDOMElement(object) {
    let thumb = document.createElement("div");
    thumb.className = "thumb";

    let anchor = document.createElement("a");
    anchor.href = getObjectURL(object);
    anchor.id = `object-${object.objectID}`;
    thumb.appendChild(anchor);


    let img = document.createElement("img");
    img.src = object.primaryImageSmall;
    img.alt = object.title;
    img.id = `object-image-${object.objectID}`;
    anchor.appendChild(img);


    let museumLabel = document.createElement("div");
    museumLabel.className = "museum-label";
    anchor.appendChild(museumLabel);

    let spanArtist = document.createElement("span");
    spanArtist.className = "artist";
    spanArtist.innerText = getArtistName(object);
    museumLabel.appendChild(spanArtist);

    let spanTitle = document.createElement("span");
    spanTitle.className = "title";
    spanTitle.innerText = object.title;
    museumLabel.appendChild(spanTitle);

    museumLabel.appendChild(document.createTextNode(", "));

    let spanDate = document.createElement("span");
    spanDate.className = "date";
    spanDate.innerText = object.objectDate;
    museumLabel.appendChild(spanDate);

    return thumb;
}


async function fetchObject(objectId) {
    const cachedObject = await localStorage.getItem(objectId.toString());
    if (cachedObject) {
        return JSON.parse(cachedObject);
    }}



function fetchHighlights() {
    return fetch("highlights.json")
    .then(response => response.json())
    .then(response => {
        return {total: response.highlights.length,
                objectIDs: response.highlights}
    });
}


async function fetchArtworks(query) {
    return query  : fetchHighlights();
}

export { performSearch, getObjectURL, getArtistName, fetchObject}
