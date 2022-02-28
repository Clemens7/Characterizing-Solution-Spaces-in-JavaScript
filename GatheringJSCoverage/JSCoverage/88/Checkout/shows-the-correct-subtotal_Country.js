// -----------------------------------------------
// Class Country
// used to store country information from Shipping API
// -----------------------------------------------
export default class Country {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}