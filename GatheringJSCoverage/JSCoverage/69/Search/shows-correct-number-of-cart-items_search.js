import searchService from './services/art_collection_service.js';
import cartService from './services/cart_service.js';

class Search {

    constructor() {
        const url = new URL(window.location.href);
        this.query = url.searchParams.get('q');
        this.search();
    }

    search = () => {
        if (this.query !== undefined && this.query !== null )
            
        else
            searchInfo.innerText = `Searching...`;
        searchService.search(this.query)
            .then(objects => {
                Search.displayObjects(objects);
                if (this.query !== undefined && this.query !== null )
                    
                else
                    searchInfo.innerText = `Search our collection of more than 400,000 artworks.`;
            })
            .catch();
    };

    static displayObjects = (objects) => {
        const searchTemplate = document.getElementById('search-template');
        const gallery = document.getElementById('gallery');
        for (let i = 0; i < objects.length; i++) {
            const templateNode = searchTemplate.content.cloneNode(true);
            templateNode.id = "search-template-" + i;
            templateNode.querySelector(".link-image").href = "config.html?objectID=" + objects[i].objectID;
            templateNode.querySelector(".object-image").src = objects[i].primaryImageSmall;
            templateNode.querySelector(".object-image").alt = objects[i].title;
            templateNode.querySelector(".artist").innerText = objects[i].artistDisplayName;
            templateNode.querySelector(".title").innerText = objects[i].title;
            templateNode.querySelector(".date").innerText = objects[i].objectDate;
            gallery.appendChild(templateNode);
        }
        searchTemplate.remove();
    };

}

const searchInfo = document.getElementById('search-info');
const cartSize = document.getElementById('cart-size');
cartSize.innerText = cartService.length !== 0  : '';
new Search();
