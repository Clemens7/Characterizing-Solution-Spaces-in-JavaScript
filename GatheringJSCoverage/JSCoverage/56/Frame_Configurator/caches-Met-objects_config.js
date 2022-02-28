import * as Frame from './frame.js';
import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export 

export 

export 

export async function setPrintSizes(image) {
    const printSizes = Frame.getPrintSizes(await image);
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes["S"][0]} × ${printSizes["S"][1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes["M"][0]} × ${printSizes["M"][1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes["L"][0]} × ${printSizes["L"][1]} cm`;
}

export function updatePage(item) {
    console.log(item);
    const image = document.getElementById("preview-image");
    renderImage(image);
    updateTotalSize(image);
    updatePrice();

    function renderImage(image) {
        const container = document.getElementById('preview-container');
        Frame.render(image, container, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    }

    function updatePrice() {
        let price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        document.getElementById('price').innerText = `€ ${price.toFixed(2)}`;
    }

    function updateTotalSize(image) {
        const totalSize = Frame.calculateTotalSize(image, item.printSize, item.frameWidth, item.matWidth);
        document.getElementById('total-size').innerText = `${totalSize['w']} x ${totalSize['h']} cm`;
    }
}

export 

export function updateCartItems() {
    let cart = localStorage.getItem('cart');
    if (cart !== null ) 
}

export async function loadObject(objectID) {
    const cached = Cache.get(objectID, Cache.CacheType.ObjId);
    if (cached) {
        return cached;
    }}
