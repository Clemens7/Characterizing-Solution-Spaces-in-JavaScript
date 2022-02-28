

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

//if response.status is 404 so no image is found null is send as response
export async function retrieveArtworksById (id) {
    const response = await fetch(`${MET_BASE_URL}objects/${id}`);
    if (response.status == 404)  else {
        return await response.json();
    }}

export function getNumberOfObjectsInCart () {
    if (!localStorage.getItem('cart')) 
    return JSON.parse(localStorage.getItem('cart')).length;
}