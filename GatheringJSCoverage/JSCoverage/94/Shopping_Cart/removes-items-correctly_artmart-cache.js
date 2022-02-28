/**
 * @param {object} artobject 
 */
export function storeObject(artobject){
    const {objectID} = artobject;
	let type = typeof objectID;
    localStorage[objectID] = JSON.stringify(artobject);
    console.log(`Object ${objectID} stored (type: ${type})`);
}

/**
 * @param {number} objectID 
 */
export function retrieveObject(objectID){
    if(objectID in localStorage) {
        console.log(`Object ${objectID} retrieved`);
        return JSON.parse(localStorage[objectID]);
    }
}

/**
 * @param {object} artObject 
 */
export 

/**
 * @param {number} objectID 
 */
export function removeFromCart(objectID){
    let cart = retrieveCart();
    if(!cart)
    const i = cart.findIndex((o)=>o.objectID === objectID);
    if(i>=0){
        cart.splice(i, 1);
        localStorage["cart"] = JSON.stringify(cart);
    }
}

export function retrieveCart(){
    if("cart" in localStorage){
        return JSON.parse(localStorage["cart"]);
    }
}