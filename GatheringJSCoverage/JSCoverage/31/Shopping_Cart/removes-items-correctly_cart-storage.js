
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

export function removeEntry(index) {
    const items = getAllEntries();
    items.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function numberOfEntries() {
    return getAllEntries().length;
}