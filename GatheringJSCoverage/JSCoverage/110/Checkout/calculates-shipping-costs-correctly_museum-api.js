import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export 

export 

export 


export async function getShippingAsync() {
    const url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
    const response = await fetch(url);

    if (!response.ok) 

    const rawData = await response.json();

    return rawData;
}

export 





