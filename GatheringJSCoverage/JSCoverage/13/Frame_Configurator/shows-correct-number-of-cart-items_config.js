import { QueryParams, Site, FrameConfig, MatConfig, PrintSizeConfig, PreviewImage, Updater, AddToCartButton } from "./config-service.js";
import { getObject } from "./metropolitan-api.js";
import { Cart } from "./cart-service.js";
// loading cart
let cart = new Cart();
// creating instances of necessary html objects
let matConfig = new MatConfig();
let frameConfig = new FrameConfig();
let printSizeConfig = new PrintSizeConfig();
let previewImage = new PreviewImage();
let addToCartButton = new AddToCartButton();
//initialize Updater
new Updater(matConfig, frameConfig, printSizeConfig, previewImage, cart);
// handling query params
let queryParams = new QueryParams();
// set html elements based on query params
queryParams.setHTMLElements(frameConfig, matConfig, printSizeConfig, addToCartButton);
// get metropolitan object or redirect
let objectIdQueryParam = queryParams.getQueryParam("objectID");
if (objectIdQueryParam !== undefined) {
    getObject(Number(objectIdQueryParam))
        .then(object => {
        if (object.message !== null) 
        // populate image and label with values from metropolitanobject
        previewImage.src = object.image;
        previewImage.alt = object.title;
        previewImage.setMuseumLabel(object.title, object.artist, object.date);
    });
}

