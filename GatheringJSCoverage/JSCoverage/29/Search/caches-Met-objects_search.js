const ENDPOINT = 'https://collectionapi.metmuseum.org/public/collection/v1/';

window.onload = async function WindowLoad(event) {
	getCart();

	const searchInfo = this.document.getElementById('search-info');

	const urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('q');

	var objectIDs = [];
	var nrOfResults = 0;
	if (query && query !== 'null') {
		searchInfo.innerHTML = `Searching for “${query}”...`;
		const res = await search(query);

		nrOfResults = res.objectIDs.length;
		objectIDs = res.objectIDs.slice(0, 100);

		searchInfo.innerHTML = `Found ${nrOfResults} artwork${
			nrOfResults === 1  : 's'
		} for “${query}”`;
	}

	Promise.all(
		objectIDs.map(async (e) => {
			var imgMeta = JSON.parse(localStorage.getItem(e));
			if (!imgMeta) 
			renderThumb(imgMeta);
		})
	);
};

function renderThumb(imgMeta) {
	localStorage.setItem(imgMeta.objectID, JSON.stringify(imgMeta));

	const thumb = document.createElement('div');
	thumb.setAttribute('class', 'thumb');

	const a = document.createElement('a');
	a.setAttribute('id', `object-${imgMeta.objectID}`);
	a.setAttribute('href', `config.html?objectID=${imgMeta.objectID}`);

	const img = document.createElement('img');
	img.setAttribute('id', imgMeta.primaryImageSmall.split('/').pop());
	img.setAttribute('src', imgMeta.primaryImageSmall);

	const label = document.createElement('div');
	label.setAttribute('class', 'museum-label');

	const artist = document.createElement('span');
	artist.setAttribute('class', 'artist');
	artist.innerHTML = imgMeta.artistDisplayName;

	const title = document.createElement('span');
	title.setAttribute('class', 'title');
	title.innerHTML = `${imgMeta.title}, `;

	const date = document.createElement('span');
	date.setAttribute('class', 'date');
	date.innerHTML = imgMeta.objectDate;

	label.appendChild(artist);
	label.appendChild(title);
	label.appendChild(date);

	a.appendChild(img);
	a.appendChild(label);

	thumb.appendChild(a);

	this.document.getElementById('gallery').appendChild(thumb);
}

async function search(query) {
	const res = await fetch(`${ENDPOINT}search?hasImages=true&q=${query}`);
	return res.json();
}



function getCart() {
	const cart = document.getElementById('cart-link');

	const key = 'cart';
	if (key in localStorage)  else {
		cart.innerHTML = 'Cart';
	}
}
