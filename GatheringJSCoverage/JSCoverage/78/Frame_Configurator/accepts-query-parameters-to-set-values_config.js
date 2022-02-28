import * as frame from "./frame.js";


var configurator = {
    dom: {
        previewImage: document.getElementById("preview-image"),
        previewContainer: document.getElementById("preview-container"),
        museumLabel: document.getElementById("image-label"),
        frameWidth: document.getElementsByName("frameWidth")[0],
        frameWidthR: document.getElementsByName("frameWidthR")[0],
        matWidth: document.getElementsByName("matWidth")[0],
        matWidthR: document.getElementsByName("matWidthR")[0],
        printSize: document.getElementsByName("printSize"),
        frameStyle: document.getElementsByName("frameStyle"),
        matColor: document.getElementsByName("matColor"),
    },

    standardParams: {
        printSize: "M",
        frameStyle: "classic",
        frameWidth: 4.0,
        matColor: "mint",
        matWidth: 5.5

    },

    init: () => {
        const objectID = configurator.getUrlVar("objectID");
        let cForm = document.getElementById('config-form');

        cForm["printSize"].value = configurator.getUrlVar("printSize") ;
        cForm["frameStyle"].value = configurator.getUrlVar("frameStyle") ;
        cForm["frameWidthR"].value = configurator.getUrlVar("frameWidth") / 10 ;
        cForm["frameWidth"].value = configurator.getUrlVar("frameWidth") / 10 ;

        cForm["matColor"].value = configurator.getUrlVar("matColor") ;

        cForm["matWidthR"].value = configurator.getUrlVar("matWidth") / 10 ;
        cForm["matWidth"].value = configurator.getUrlVar("matWidth") / 10 ;

        configurator.setCartCount();
        configurator.initEvents();

        configurator.getLsObject(objectID).then(object => {

            if (object === null) 

            configurator.setImageSrc(object.primaryImageSmall);

            const artistLabel = document.createElement("span");
            artistLabel.appendChild(document.createTextNode(object.artistDisplayName));
            artistLabel.className = "artist";
            configurator.dom.museumLabel.appendChild(artistLabel);

            const titleLabel = document.createElement("span");
            titleLabel.appendChild(document.createTextNode(object.title));
            titleLabel.className = "title";
            configurator.dom.museumLabel.appendChild(titleLabel);

            const dateLabel = document.createElement("span");
            dateLabel.appendChild(document.createTextNode(", " + object.objectDate));
            dateLabel.className = "date";
            configurator.dom.museumLabel.appendChild(dateLabel);

            configurator.render();
        });
    },

    initEvents: () => {
        let bindOnChange = 

        configurator.dom.frameWidth.onchange = ;
        configurator.dom.frameWidthR.oninput = ;

        configurator.dom.matWidth.onchange = ;
        configurator.dom.matWidthR.oninput = ;

        let setInputOnChangeRender = (inputs) => {
            inputs.forEach(element => {
                element.onchange = configurator.render;
            });
        }

        setInputOnChangeRender(configurator.dom.printSize);
        setInputOnChangeRender(configurator.dom.frameStyle);
        setInputOnChangeRender(configurator.dom.matColor);

        document.getElementById("config-form").onSubmit = ;

    },

    getUrlVar: (name) => {
        const getUrlVars = () => {
            let vars = {};
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        return getUrlVars()[name] ;
    },

    getLsObject: async function (objectID) {
        await null;
        let picture = JSON.parse(localStorage.getItem(objectID));
        if (!picture) {
            picture = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID).then(data => data.json());
            if ((picture ).objectID == null) 
            localStorage.setItem(picture.objectID, JSON.stringify(picture));

        }
        return picture;
    },

    setImageSrc: (imgUrl) => {
        configurator.dom.previewImage.src = imgUrl;
    },

    getRadioValue: (name) => {
        let cForm = document.getElementById('config-form');
        return cForm[name].value;
    },

    render: () => {
        const printSize = configurator.getRadioValue("printSize");
        const frameStyle = configurator.getRadioValue("frameStyle");
        const matColor = configurator.getRadioValue("matColor");
        frame.render(configurator.dom.previewImage, configurator.dom.previewContainer,
            printSize,
            frameStyle,
            configurator.dom.frameWidth.value * 10,
            matColor,
            configurator.dom.matWidth.value * 10);

        const price = frame.calculatePrice(printSize, frameStyle, configurator.dom.frameWidth.value * 10, configurator.dom.matWidth.value * 10);
        document.getElementById('price').innerHTML = "€ " + price.toFixed(2);

        let cForm = document.getElementById('config-form');

        const pSizes = frame.getPrintSizes(configurator.dom.previewImage);
        const totalWidth = pSizes[cForm["printSize"].value][0] + 20 * cForm["frameWidth"].value + 20 * cForm["matWidth"].value;
        const totalHeight = pSizes[cForm["printSize"].value][1] + 20 * cForm["frameWidth"].value + 20 * cForm["matWidth"].value;
        document.getElementById("print-size-s-label").innerHTML = "Small <br>" + pSizes['S'][0] / 10 + " × " + pSizes['S'][1] / 10 + " cm"
        document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + pSizes['M'][0] / 10 + " × " + pSizes['M'][1] / 10 + " cm"
        document.getElementById("print-size-l-label").innerHTML = "Large <br>" + pSizes['L'][0] / 10 + " × " + pSizes['L'][1] / 10 + "cm"
        document.getElementById('total-size').innerHTML = Math.round(totalWidth) / 10 + " × " + Math.round(totalHeight) / 10 + " cm";
    },

    setCartCount: () => {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById("cart-link").innerText = (cart.length > 0  : "Cart");
    },

    addToCard: 

}

configurator.init();

window.configurator = configurator;

