/**
 * Class for search helper functions +  DOM functions
 */

/*
 * Returns ID
 * */
import {
    Painting
} from './picture.js';

export async function getIDResultFromSearch() {
    const params = (new URL(document.location)).searchParams;
    const pictureQuery = params.get('q');

    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${pictureQuery}`;

    try {
        const response = await fetch(API_URL);}


export 


export 


export 
