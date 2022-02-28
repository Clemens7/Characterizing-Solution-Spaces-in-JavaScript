import API from './APIRequests.js'
import * as Frame from './frame.js';


export default class ShoppingCart {

   constructor() {
   }

    /**
     * 
     * @param {number} id an object id  
     * @param {Object} data the frame config for that particular id
     *  data has the following elements: 
     *  printSize
     *  frameWidth
     *  frameStyle
     *  frameWidth
     *  matColor
     *  matWidth
     */
    


    /**
     * @returns {number} the number of added items in the shopping cart
     */
    itemCount() {
        return this.getIDs().length

    }
    
    

    /**
     * gets all ids 
     * @returns {Array<number>} numbers in the cart
     */
    getIDs() {
        if(localStorage.getItem('cart')) {
            let arr = JSON.parse(localStorage.getItem('cart'))
            let result = []
            for (let i = 0; i < arr.length; i++) 
            return result
        }}

    /**
     * 
     * @param {number} id the id of the objec
     * @returns {Object | null} the configuration or null if the id does not exist 
     */
    

   
    /**
     * updates the header so that instead of cart we have cart ('itemCount')
     */
    updateHeader() {
        if (localStorage.getItem('cart')) 
            document.getElementById('cart-link').innerHTML = `Cart (${this.itemCount()})`
    }

}

