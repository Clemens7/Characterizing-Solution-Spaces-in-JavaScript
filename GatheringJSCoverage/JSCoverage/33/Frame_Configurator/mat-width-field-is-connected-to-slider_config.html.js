
    import * as frame from './frame.js';
    import * as cart from './cart.js';

    

    

    

    function onChangeMatWidth(e) {
        e.target.value = Math.round(10 * +e.target.value) / 10;
        if (e.target.value < 0) 
        if (e.target.value > 10) 
        document.getElementsByName("matWidthR")[0].value = e.target.value;
        updateView();
    }

    function sizeToDisplayString(size, printSize) {
        let sizeText = "";
        if (printSize === "S") {
            sizeText = "Small<br>";
        } else if (printSize === "M") {
            sizeText = "Medium<br>";
        } else if (printSize === "L") {
            sizeText = "Large<br>";
        }
        return `${sizeText}${size[0] / 10} cm x ${size[1] / 10} cm`;
    }

    function calculateAndSetTotalSize(frameSizes, frameWidth, matWidth, printSize) {
        let printSizes = frameSizes[printSize].map(x => (Number(x) + Number(frameWidth) + Number(matWidth)));
        document.getElementById("total-size").innerText = sizeToDisplayString(printSizes);
    }

    function setImageSizes(img) {
        let frameSizes = frame.getPrintSizes(img);
        document.getElementById("print-size-s-label").innerHTML = sizeToDisplayString(frameSizes["S"], "S");
        document.getElementById("print-size-m-label").innerHTML = sizeToDisplayString(frameSizes["M"], "M");
        document.getElementById("print-size-l-label").innerHTML = sizeToDisplayString(frameSizes["L"], "L");
    }

    function updateView() {
        const img = document.getElementById('preview-image');
        const container = document.getElementById("preview-container");
        const printSize = document.querySelector('input[name="printSize"]:checked').value;
        const frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
        const frameWidth = document.getElementsByName("frameWidth")[0].value;
        const matColor = document.querySelector('input[name="matColor"]:checked').value;
        const matWidth = document.getElementsByName("matWidth")[0].value;

        let frameSizes = frame.getPrintSizes(img);

        calculateAndSetTotalSize(frameSizes, frameWidth * 10, matWidth * 10, printSize);

        frame.render(img, container, printSize, frameStyle, frameWidth * 10, matColor, matWidth * 10);
        document.getElementById("price").innerHTML = "&euro; " + frame.calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10).toFixed(2);
    }

    function cachedFetch(url, options) {
        let cached = sessionStorage.getItem(url);
        if (cached != null) 
        return fetch(url, options).then(response => {
            if (response.status === 200) {
                let ct = response.headers.get('Content-Type')
                if (ct && (ct.match(/application\/json/i) )) {
                    response.clone().text().then(content => sessionStorage.setItem(url, content));
                }
            }
            return response;
        })
    }

    function loadImageByObjectID() {
        const urlParams = new URLSearchParams(window.location.search);
        const objectID = urlParams.get('objectID');
        if (objectID != null) {
            document.getElementById("object-id").value = objectID;

            let frameWidth = parseInt(urlParams.get('frameWidth'), 10);
            if (!isNaN(frameWidth) ) 
            let matWidth = parseInt(urlParams.get('matWidth'), 10);
            if (!isNaN(matWidth) ) 

            const printSize = urlParams.get('printSize');
            if (["S", "M", "L"].includes(printSize)) 
            const frameStyle = urlParams.get('frameStyle');
            if (["classic", "natural", "shabby", "elegant"].includes(frameStyle)) 
            const matColor = urlParams.get('matColor');
            if (["ivory", "mint", "wine", "indigo", "coal"].includes(matColor)) 
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;

            cachedFetch(url)
                .then(response => response.json())
                .then(data => {
                    let img = document.getElementById('preview-image');
                    if (data.primaryImageSmall != null && data.primaryImageSmall !== "") {
                        img.onload = function (e) {
                            setImageSizes(e.target);
                            updateView();
                        };
                        img.src = data.primaryImageSmall;

                        let imageLbl = document.getElementById("image-label");
                        let header = document.createElement("h3");
                        header.innerText = data.title;
                        imageLbl.appendChild(header);

                        let text = document.createElement("p");
                        text.innerText = data.artistDisplayName + " " + data.objectDate;
                        imageLbl.appendChild(text);

                    }
                })
                .catch();
        }
    }

    

    

    // self executing function here
    (function () {
        // your page initialization code here
        // the DOM will be available here
        cart.updateCartSize();

        document.getElementsByName("frameWidth")[0].onchange = onChangeFrameWidth;
        document.getElementsByName("matWidth")[0].onchange = onChangeMatWidth;
        document.getElementsByName("frameWidthR")[0].onchange = onChangeFrameWidthSlider;
        document.getElementsByName("matWidthR")[0].onchange = onChangeMatWidthSlider;

        loadImageByObjectID();

        document.getElementById("config-form").addEventListener("submit",addConfigToCartAndRedirect);

        document.getElementsByName("matColor").forEach((i) => i.onclick = updateView);
        document.getElementsByName("printSize").forEach((i) => i.onclick = updateView);
        document.getElementsByName("frameStyle").forEach((i) => i.onclick = updateView);
    })();
