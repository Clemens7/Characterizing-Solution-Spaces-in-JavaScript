import { Picture } from './localStorage.js';

export function retrieve(attribute) {
   
    if(attribute in localStorage) 
}

export function store(attribute, picture) {
 
    //console.log(`Storing ${attribute} in local storage`);
    localStorage[attribute] = JSON.stringify(picture); 
}

export 

export 

export 
export 

export function cartSize(){
    let existing = localStorage.getItem('cart');
    existing = existing  : [];
    return existing.length;
}

export 


export function countQuantity() {
    let count = 0;
    for(let elem in localStorage) {
        let pic = localStorage[elem];
        if(pic.quantity != 0)
        count += pic.quantity;
        console.log(pic);
    }
    return count;
}