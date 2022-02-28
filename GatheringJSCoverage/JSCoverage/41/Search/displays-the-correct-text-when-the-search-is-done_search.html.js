
		import * as MetAPI from './metAPI.js';
		import { ItemDocumentContainer } from './met-dom.js';
		import * as jsonHelper from './jsonHelper.js';
		import * as cartLinkHelper from './cartLinkHelper.js';

		let container = new ItemDocumentContainer("gallery");

		

		async function loadObjects(ids) {
			container.clear();
			if (ids !== null)  else {
				return 0;
			}}

		async function updateHeader(text) {
			document.getElementById("search-info").innerText = text;
		}

		async function search(query) {
			updateHeader('Searching for “' + query + '”...')
			let count = await loadObjects(await MetAPI.search(query));
			if (count === undefined) 
			let artworksText = "artworks"
			if (count === 1) 
			updateHeader('Found ' + count + ' ' + artworksText + ' for “' + query + '”')
		}

		

		document.addEventListener('DOMContentLoaded', event => {
			const params = (new URL(document.location)).searchParams;
			const searchquery = params.get('q');
			if (!searchquery)  else {
				document.getElementById('search').value = searchquery;
				search(searchquery);
			}
		});

		// async function updateCartLink() {
		// 	const items = await CartCache.retrieveAll();
		// 	if (!items || items.length < 1) {
		// 		document.getElementById("cart-link").innerText = `Cart`;
		// 	} else {
		// 		document.getElementById("cart-link").innerText = `Cart (${items.length})`;
		// 	}
		// }

		const form = document.querySelector('.search-form');
		form.addEventListener('submit', );

		cartLinkHelper.updateCartLink();
	