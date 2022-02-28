import { CartItemsContainer } from "./header-dom.js";

document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("header js loaded");
    let test = new CartItemsContainer();
    test.refresh();

});