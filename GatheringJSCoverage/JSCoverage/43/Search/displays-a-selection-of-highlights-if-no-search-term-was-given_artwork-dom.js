import { Artwork } from "/artwork.js";

export class ArtworkDocumentContainer {

	constructor(containerID='gallery'){
		this.container = document.getElementById(containerID);
		if(!this.container) 
	}

	clear(){
		this.container.innerHTML = '';
	}


	addToDocument(artwork){
		

			const thumb = document.createElement('div');
			thumb.classList.add("thumb");
			this.container.appendChild(thumb);

			const link = document.createElement('a');
			link.href = "/config.html?objectID=" + artwork.objID;
			thumb.appendChild(link);

			const image = document.createElement('img');
			console.log(artwork.image);
			image.src = artwork.image;
			image.alt = artwork.altText;
			link.appendChild(image);
			
			const museumLabel = document.createElement('div');
			museumLabel.classList.add("museum-label");
			link.appendChild(museumLabel);
			
			const artist = document.createElement('span');
			artist.classList.add("artist");
			artist.innerHTML = artwork.artist;
			museumLabel.appendChild(artist);
			const title = document.createElement('span');
			title.classList.add("title");
			title.innerHTML = artwork.title;
			museumLabel.appendChild(title);
			const date = document.createElement('span');
			date.classList.add("date");
			date.innerHTML = ", " + artwork.date;
			museumLabel.appendChild(date);

		
	}
}