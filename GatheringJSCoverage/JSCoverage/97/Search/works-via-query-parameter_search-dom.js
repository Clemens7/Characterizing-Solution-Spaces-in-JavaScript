/**
 * Used to change the gallery DOM of the search.
 */
export class SearchDom {
    /**
     * @param containerID the id of the gallery container.
     */
    constructor(containerID = "gallery") {
        const tmpContainer = document.getElementById(containerID);
        if (!tmpContainer) 
        else {
            this.container = tmpContainer;
        }
    }
    /**
     * Clears the contents of the gallery container.
     */
    clearContainer() {
        this.container.innerHTML = "";
    }
    /**
     * Creates the DOM structure for the given Artwork object and appends it to the gallery container.
     * @param artwork The artwork to append to the container.
     */
    addArtworkToContainer(artwork) {
        let thumb = document.createElement("div");
        thumb.classList.add("thumb");
        let link = document.createElement("a");
        link.href = `config.html?objectID=${artwork.objectID}`;
        thumb.appendChild(link);
        let img = document.createElement("img");
        img.src = artwork.imageSrc;
        img.alt = `Artwork of ${artwork.artist}, Title: ${artwork.title}, Date: ${artwork.date}`;
        link.appendChild(img);
        let label = document.createElement("div");
        label.classList.add("museum-label");
        link.appendChild(label);
        let artist = document.createElement("span");
        artist.classList.add("artist");
        artist.innerText = artwork.artist;
        label.appendChild(artist);
        let title = document.createElement("span");
        title.classList.add("title");
        title.innerText = artwork.title;
        label.appendChild(title);
        label.appendChild(document.createTextNode(", "));
        let date = document.createElement("span");
        date.classList.add("date");
        date.innerText = artwork.date;
        label.appendChild(date);
        this.container.appendChild(thumb);
    }
}
