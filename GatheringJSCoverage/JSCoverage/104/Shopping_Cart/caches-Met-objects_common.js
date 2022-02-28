

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

//if response.status is 404 so no image is found null is send as response
export 

export function getNumberOfObjectsInCart () {
    if (!localStorage.getItem('cart')) 
    return JSON.parse(localStorage.getItem('cart')).length;
}