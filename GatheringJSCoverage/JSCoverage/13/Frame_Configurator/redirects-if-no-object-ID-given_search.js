import { searchMET, getObject } from "./metropolitan-api.js";
//import * as highlightsJson from "./highlights.json";
initSearch();
function initSearch() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("q") ) 
    else {
        fetch('highlights.json')
            .then(res => res.json())
            .then((data) => {
            var promises = [];
            data.highlights.forEach(id => {
                promises.push(getObject(id));
            });
            Promise.all(promises).then();
        })
            .catch();
    }
}




