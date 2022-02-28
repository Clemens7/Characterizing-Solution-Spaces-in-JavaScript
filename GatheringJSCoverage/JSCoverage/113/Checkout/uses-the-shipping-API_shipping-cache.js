export const storeDestinations = (destinations) => {
    console.log(`Storing destinations in local storage.`);
    localStorage.setItem('destinations', JSON.stringify(destinations));
};

export const fetchDestinations = () => {
    console.log(`Fetching destinations from local storage.`);
    return JSON.parse(localStorage.getItem('destinations'));
};
