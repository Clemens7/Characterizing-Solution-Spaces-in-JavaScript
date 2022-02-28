import { Picture } from './localStorage.js';

export function retrieve(attribute) {
   
    if(attribute in localStorage) {
        //console.log(`Retrieving ${attribute} from local storage`);
        return JSON.parse(localStorage[attribute]);
    }
}

export function store(attribute, picture) {
 
    //console.log(`Storing ${attribute} in local storage`);
    localStorage[attribute] = JSON.stringify(picture); 
}

export 

export function removeFromCart(id) {
    let existing = localStorage.getItem('cart');
    existing = existing ? JSON.parse(existing) ;
    existing = existing.filter(function(el){
        return el.objectID !== id;
    });
    localStorage.setItem('cart', JSON.stringify(existing));
}

export 
export 

export function cartSize(){
    let existing = localStorage.getItem('cart');
    existing = existing ? JSON.parse(existing) ;
    return existing.length;
}

export 


export 