export async function getShippingInfos() {
    
  try {
    const url = api_url();
    const response = await fetch(url);
    const rawData = await response.json();
    const responseDestinations = await rawData.destinations;
    console.log(responseDestinations);
    return responseDestinations;
  }}

  function api_url() {
    return 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
  }
