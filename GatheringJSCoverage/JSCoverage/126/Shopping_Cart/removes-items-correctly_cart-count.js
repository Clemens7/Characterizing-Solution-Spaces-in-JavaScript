var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done ? resolve(result.value) ; }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function setCurrentCartCount() {
    return __awaiter(this, void 0, void 0, function* () {
        let storage = localStorage.getItem("cart");
        if (storage !== null) {
            let carts = JSON.parse(storage);
            if (carts !== null) {
                let cartHeaderHTML = document.getElementById("cart-link");
                if (!cartHeaderHTML) 
                else {
                    if (carts.length > 0) {
                        cartHeaderHTML.innerText = "Cart (" + carts.length + ")";
                    }
                }
            }
        }
    });
}
