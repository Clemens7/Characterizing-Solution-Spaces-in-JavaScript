import { Artwork } from './art-object.js';
import * as Cache from './art-cache.js';

export class ArtworkContainer{
	constructor(){
		this.container = document.getElementById("gallery");
	}

	addArtworks(artworks) {
		for(let artwork of artworks){
			this.container.appendChild(this.createArtworkItem(artwork));
		}
	}

	createArtworkItem(artwork){
		var div = document.createElement("div");
		div.className = "thumb";

		var link = document.createElement("a");
		link.id = `object-${artwork.objectID}`;
		link.href = `./config.html?objectID=${artwork.objectID}` // TODO change

		var img = document.createElement("img");
		img.id = `object-image-${artwork.objectID}`;
		img.src = artwork.imageUrl;
		img.alt = "";

		var label = document.createElement("div");
		label.className = "museum-label";

		var artist = document.createElement("span");
		artist.className = "artist";
		artist.appendChild(document.createTextNode(artwork.artist));
		label.appendChild(artist);

		var title = document.createElement("span");
		title.className = "title";
		title.appendChild(document.createTextNode(artwork.title));
		label.appendChild(title);

		label.appendChild(document.createTextNode(", "));
	
		var date = document.createElement("span");
		date.className = "date";
		date.appendChild(document.createTextNode(artwork.date));
		label.appendChild(date);

		link.appendChild(img);	
		link.appendChild(label);	
		div.appendChild(link);
		return div;
	}
}