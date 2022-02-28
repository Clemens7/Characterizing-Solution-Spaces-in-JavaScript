
        import {$, $all} from "./helper.js";
        import {setOption, renderPreview, getArtObject, setQueryConfigOptions, addToCart} from "./frameConfigurator.js";
        import {updateCartCountInHeader} from "./header.js";

        

        

        

        function addEventListeners(artObject) {
            for (let node of $all(
                "input[type='radio'][name='printSize'], " +
                ".frame-style-row input[type='radio'], " +
                ".mat-color-row input[type='radio']"
            )) {
                node.addEventListener("click", radioEvent);
            }

            for (let node of $all(
                "input[type='range'][name='matWidthR']," +
                "input[type='range'][name='frameWidthR']"
            )) {
                node.addEventListener("change", rangeEvent);
            }

            for (let node of $all(
                "input[type='number'][name='matWidth']," +
                "input[type='number'][name='frameWidth']"
            )) {
                node.addEventListener("change", numberEvent);
            }

            $("button[type='submit'].buy").addEventListener("click", );
        }

        updateCartCountInHeader();
        setQueryConfigOptions();
        getArtObject().then(artObject => {
            if (!!artObject) {
                renderPreview(artObject);
                addEventListeners(artObject);
            }
        }).catch();
    