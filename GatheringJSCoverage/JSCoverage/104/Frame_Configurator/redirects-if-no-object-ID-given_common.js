

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

//if response.status is 404 so no image is found null is send as response
export async function retrieveArtworksById (id) {
    const response = await fetch(`${MET_BASE_URL}objects/${id}`);}

export function getNumberOfObjectsInCart () {
    if (!localStorage.getItem('cart')) {
        return 0;
    }