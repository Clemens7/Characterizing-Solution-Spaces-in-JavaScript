
		import * as MetAPI from './metAPI.js';
		import { ItemDocumentContainer } from './met-dom.js';
		import * as jsonHelper from './jsonHelper.js';
		import * as cartLinkHelper from './cartLinkHelper.js';

		let container = new ItemDocumentContainer("gallery");

		async function loadHighlights() {
			jsonHelper.loadJSON(data => {
				loadObjects(JSON.parse(data).highlights);
			});
		}

		async function loadObjects(ids) {
			container.clear();
			if (ids !== null) {
				let i = 0;
				while (i < ids.length && i < 100) {
					addMetObjToDom(await MetAPI.retrieveObj(ids[i])}

		

		

		

		document.addEventListener('DOMContentLoaded', event => {
			const params = (new URL(document.location)).searchParams;
			const searchquery = params.get('q');
			if (!searchquery) {
				loadHighlights();
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
	