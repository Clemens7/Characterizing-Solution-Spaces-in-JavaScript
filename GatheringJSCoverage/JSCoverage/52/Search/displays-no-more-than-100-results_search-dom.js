let currentCount = 0;
import { MAX_ARTWORKS } from "./search.js";
import { Artwork } from '../models.js';
/**
 * @summary Wrapps DOM functionality for #gallery element.
 */
export class SearchResultContainer{
    constructor(){
        this.container = document.getElementById("gallery");
        this.limit = 100;
    }
    /**
     * @summary Renders artwork and adds it to the #gallery element.
     * @param {Artwork} artwork Artwrok, which should be rendered.
     */
    render(artwork) {
        this.container.appendChild(createHTMLElement("div", {"class": "thumb"}, [
            createHTMLElement("a", {
                "href": `./config.html?objectID=${artwork.id}`,
                "id": `object-${currentCount}`
            }, [
                createHTMLElement("img", {
                    "src":`${artwork.img}`,
                    "alt": `${artwork.title}`,
                    "id":`object-image-${currentCount}`
                }),
                createHTMLElement("div", {"class":"museum-label"},[
                    createHTMLElement("span", {"class": "artist"},artwork.artist),
                    createHTMLElement("span", {"class": "title"},artwork.title),
                    createHTMLElement("span", {"class": "date"},`, ${artwork.date}`),
                ])
            ])
        ]));
        currentCount++;
    }
    /**
     * @summary Clears all child elements of #gallery element
     */
    clear(){
        currentCount++;
        this.container.innerHTML = '';
    }

}
/**
 * @summary Wrapps DOM functionality for #search-info element.
 */
export class SearchInfo{
    constructor(){
        this.element = document.getElementById('search-info');
    }
    /**
     * @summary Changes search-info text according to assignment.
     * @param {String} query Search query
     */
    startSearch(query){
        if(!query)
        this.element.innerHTML = `Searching for “${query}”...`;
    }
    /**
     * @summary Changes search-info text to text after search according to assignment.
     * @param {String} query Search query
     * @param {Number} amount Amount of search results.
     */
    searchFinished(query, amount){
        if(!query)
        this.element.innerHTML = `Found ${(amount > MAX_ARTWORKS) ? MAX_ARTWORKS } artwork${(amount == 1)  : "s"} for “${query}”`;
    }

}
/**
 * @summary Provides element creation functionality.
 */
function createHTMLElement(tag, attributes, content = null){
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    if (Array.isArray(content)){
        content.forEach(child => {
            element.appendChild(child);
        });
    }
    else if (content != ""){
        element.innerHTML = content;
    }

    return element;
}
