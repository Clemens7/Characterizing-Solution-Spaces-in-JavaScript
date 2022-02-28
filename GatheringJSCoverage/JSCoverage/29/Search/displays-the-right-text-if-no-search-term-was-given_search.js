const ENDPOINT = 'https://collectionapi.metmuseum.org/public/collection/v1/';

window.onload = async function WindowLoad(event) {
	getCart();

	const searchInfo = this.document.getElementById('search-info');

	const urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('q');

	var objectIDs = [];
	var nrOfResults = 0;
	if (query )  else if (query === 'null')  else {
		const res = await this.fetch('highlights.json');
		const json = await res.json();
		objectIDs = json.highlights;
	}

	Promise.all(
		objectIDs.map(async (e) => {
			var imgMeta = JSON.parse(localStorage.getItem(e));
			if (!imgMeta) {
				imgMeta = await this.object(e);})
	);
};





async function object(objectId) {
	const res = await fetch(`${ENDPOINT}objects/${objectId}`);
	return res.json();
}

function getCart() {
	const cart = document.getElementById('cart-link');

	const key = 'cart';
	if (key in localStorage)  else {
		cart.innerHTML = 'Cart';
	}
}
