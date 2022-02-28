import { Artwork } from "/artwork.js";

export class ArtworkDocumentContainer {

	constructor(containerID='gallery'){
		this.container = document.getElementById(containerID);
		if(!this.container) 
	}

	clear(){
		this.container.innerHTML = '';
	}


	
}