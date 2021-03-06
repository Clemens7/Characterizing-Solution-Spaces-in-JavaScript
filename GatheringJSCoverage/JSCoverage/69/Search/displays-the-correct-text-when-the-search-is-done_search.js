import searchService from './services/art_collection_service.js';
import cartService from './services/cart_service.js';

class Search {

    constructor() {
        const url = new URL(window.location.href);
        this.query = url.searchParams.get('q');
        this.search();
    }

    search = () => {
        if (this.query !== undefined && this.query !== null && this.query !== "")
            searchInfo.innerText = `Searching for “${this.query}”...`;
        searchService.search(this.query)
            .then(objects => {
                Search.displayObjects(objects);
                if (this.query !== undefined && this.query !== null && this.query !== "")
                    searchInfo.innerText = `Found ${objects.length} artwork${objects.length === 1  : 's'} for “${this.query}”`;
            })
            .catch();
    };

    static displayObjects = (objects) => {
        const searchTemplate = document.getElementById('search-template');
        const gallery = document.getElementById('gallery');
        for (let i = 0; i < objects.length; i++) 
        searchTemplate.remove();
    };

}

const searchInfo = document.getElementById('search-info');
const cartSize = document.getElementById('cart-size');
cartSize.innerText = cartService.length !== 0  : '';
new Search();
