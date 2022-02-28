/**
 * @param {object} artobject 
 */
export 

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
export 

export function retrieveCart(){
    if("cart" in localStorage){
        return JSON.parse(localStorage["cart"]);
    }
}