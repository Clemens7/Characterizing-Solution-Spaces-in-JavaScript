import API from './APIRequests.js'
import * as Frame from './frame.js';
import ShoppingCart from './ShoppingCart.js'

class Loader {
    constructor () {
        this.cart = new ShoppingCart()
        this.cart.updateHeader()
        
        const ids = this.cart.getIDs()
        if (ids && ids.length) {
            console.log(ids.length)
            this.processObjectIDs(ids)
        }

    }

    

    

    processObjectIDs(objectIDs) {
        // Loop for total amount of results but not more than 100 times
        for (var i = 0; i < objectIDs.length && i < 100; i++) {
            this.update(new CartItem(objectIDs[i]))
        }}

    

    

}


class CartItem {

    constructor(objectInfoJSON) {
        console.log(objectInfoJSON)
        this.objectID = objectInfoJSON.objectID
        this.artistDisplayName = objectInfoJSON.artistDisplayName
        this.title = objectInfoJSON.title
        this.objectDate = objectInfoJSON.objectDate
        this.price =  this.getPrice()
        this.description = this.getDescription()
        this.image = objectInfoJSON.primaryImageSmall; //sollte render sein
    }

    

    getPrice() {
        let data = new ShoppingCart().getItem(this.objectID)
        console.log(JSON.stringify(data))
        let result = Frame.calculatePrice(data['printSize'],data['frameStyle'],data['frameWidth'],data['matWidth'])

        if (localStorage.getItem('price') === 0 ) }

    
    
}
new Loader();