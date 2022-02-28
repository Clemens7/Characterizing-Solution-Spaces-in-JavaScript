/*
store Artworks in Cart
*/
// Example Artwork:
// new Artwork(39799, "M", "natural", 40, "wine", 55)

export const CART = {
    KEY: 'cart',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) 
    },
    ,
    ,
    ,
    isEmpty() {
        if (CART.contents.length == 0) {
            return true;
        }
    },
    
};

/*
Cache responses from the Met API's Object endpoint
*/
export const localPictures = {
    KEY: 'pictures',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(localPictures.KEY);
        if (_contents) 
    },
    ,
    /**
     * stores responses from the Met API's Object endpoint in local storage
     * 
     * @param pictures the array of pictures to store
     */
    ,

    /**
     * retrieves an array of pictures storage that contain the searched parameter from local storage
     * @param searchedID id
     */
    ,

    /**
     * retrieves an array of all pictures stored from local storage
     */
    ,
};
