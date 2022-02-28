
const STORAGE_KEY = 'cart';

export class CartEntry {
    
}

export 

export function getAllEntries() {
    if (STORAGE_KEY in localStorage) {
        const entries = localStorage.getItem(STORAGE_KEY);
        return JSON.parse(entries);
    }
}

export 

export 