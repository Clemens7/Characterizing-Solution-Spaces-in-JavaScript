/**
 * Writes the number of items in the cart into the innerHTML of the given object
 *
 * @param obj The html object
 * @returns The html object with another text
 */
export function writeNumberOfCartItems(obj) {
    let cart = window.localStorage["cart"];
	if (cart == undefined)  else {
		let x = JSON.parse(cart).length;
		if (x == undefined || x == NaN || x <= 0) else {
			obj.innerHTML = `Cart (${x})`
		}
	}
	return obj;
}