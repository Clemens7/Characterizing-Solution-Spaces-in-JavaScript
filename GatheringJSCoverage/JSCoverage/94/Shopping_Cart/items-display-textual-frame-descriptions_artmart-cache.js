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
    if(objectID in localStorage) 
}

/**
 * @param {object} artObject 
 */
export 

/**
 * @param {number} objectID 
 */
export 

export function retrieveCart(){
    if("cart" in localStorage){
        return JSON.parse(localStorage["cart"]);
    }
}