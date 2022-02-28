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
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    ,
    ,
    ,
    size() {
        return CART.contents.length;
    }
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
    async sync() {
        let _pictures = JSON.stringify(localPictures.contents);
        await localStorage.setItem(localPictures.KEY, _pictures);
    },
    /**
     * stores responses from the Met API's Object endpoint in local storage
     * 
     * @param pictures the array of pictures to store
     */
    store(pictures) {
        let _noDoublePictures = pictures.filter(item1 =>
            !this.contents.some(item2 =>
                item2.id == item1.id
            )
        )
        localPictures.contents = localPictures.contents.concat(_noDoublePictures);
        localPictures.sync();
    },

    /**
     * retrieves an array of pictures storage that contain the searched parameter from local storage
     * @param searchedID id
     */
    retrieve(searchedID) {
        return localPictures.contents.filter();
    },

    /**
     * retrieves an array of all pictures stored from local storage
     */
    ,
};
