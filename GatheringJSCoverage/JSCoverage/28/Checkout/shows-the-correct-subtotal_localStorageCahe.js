import { Picture } from './localStorage.js';

export function retrieve(attribute) {
   
    if(attribute in localStorage) {
        //console.log(`Retrieving ${attribute} from local storage`);
        return JSON.parse(localStorage[attribute]);
    }
}

export 

export 

export 

export 
export 

export function cartSize(){
    let existing = localStorage.getItem('cart');
    existing = existing ? JSON.parse(existing) ;
    return existing.length;
}

export 


export 