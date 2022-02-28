export class GalleryDocumentContainer {
    constructor(containerID = "gallery") {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    

}
