import {
  ShippingDestination
} from './shipping-destination.js';

const ARTMART_API_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

export async function retrieveShippingDestinations() {
  try {
    const response = await fetch(ARTMART_API_URL);
    const responseJSON = await response.json();
    const responseDestinations = responseJSON.destinations;
    const destinations = responseDestinations.map(destination => new ShippingDestination(destination.country, destination.displayName, destination.cost));
    return destinations;
  }}


export function retrieveCountryDisplayNames(destinations) {
  const countries = destinations.map(destination => destination.displayName);
  return countries;
}

export 