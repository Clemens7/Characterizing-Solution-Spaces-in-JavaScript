const CART_KEY = 'cart';

export function getCart(){
    const items = localStorage.getItem(CART_KEY);

    if(items === null)else{
        return JSON.parse(items);
    }
}