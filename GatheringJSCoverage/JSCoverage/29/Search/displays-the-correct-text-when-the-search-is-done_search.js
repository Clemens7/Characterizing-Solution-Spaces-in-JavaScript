const ENDPOINT = 'https://collectionapi.metmuseum.org/public/collection/v1/';

window.onload = async function WindowLoad(event) {
	getCart();

	const searchInfo = this.document.getElementById('search-info');

	const urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('q');

	var objectIDs = [];
	var nrOfResults = 0;
	if (query && query !== 'null')  else if (query === 'null') {
		searchInfo.innerHTML = `Found 0 artworks for “null”`;
	}

	Promise.all(
		objectIDs.map()
	);
};







function getCart() {
	const cart = document.getElementById('cart-link');

	const key = 'cart';
	if (key in localStorage)  else {
		cart.innerHTML = 'Cart';
	}
}
