export class DestinationDocumentContainer {
    constructor(containerID='country') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addDestinationToDocument(destination) {
        this.container.appendChild(createDestinationElements(destination));

        function createDestinationElements(destination) {
            const option = document.createElement("option");
            option.innerText = destination.displayName;
            option.value=destination.country;
            return option;
        }
    }
    static 
}