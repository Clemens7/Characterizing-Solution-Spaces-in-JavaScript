

        const urlPrefixWithSearchWord = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=`;
        const form = document.querySelector('#search-section form');


        function processRequest(value) {
            let artWorksData;

            if (value == null)  else {
                if (value.length === 0)  else {
                    artWorksData = retrieveSearchWord(value);
                }
            }

                artWorksData.then(info => {
                    console.log("info: " + info);
                    removeFromHtml();
                    loadArtWorks(info, value)
                });
        }


        form.addEventListener('submit', );

        document.addEventListener('DOMContentLoaded', event => {
            if('cart' in localStorage) 
            const params = (new URL(document.location)).searchParams;
            const artQuery = params.get('q');
            document.getElementById('search').value = artQuery;
            processRequest(artQuery);
        });

        

        async function retrieveSearchWord(searchWord) {
            document.getElementById("search-info").textContent = "Searching for “" + searchWord + "”...";
            let url;
            let rawData;
            url = urlPrefixWithSearchWord + `${searchWord}`;

            try {
                const response = await fetch(url);
                rawData = await response.json();

            } 
            if (rawData.objectIDs === null) 

            return rawData.objectIDs.slice(0, 100);
        }

        async function loadArtWorks(data, value) {
            let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
            let fetches = [];
            let toSave = [];
            let counter = 0;
            let localObjectBool;
            let gallery = document.getElementById("gallery");

            if (data != null) {
                for (let entry of data) {
                    let objUrl = url + entry;

                    if (localStorage[entry] != null) {
                        let obj = addObjToHtml(JSON.parse(localStorage[entry]));
                        //gallery.appendChild(obj);
                        toSave.push({"entry": entry, "info": JSON.parse(localStorage[entry])});
                                counter++;
                    }
                }

                if (fetches.length !== 0) 

                if (counter === 1) 
                if (counter > 1 ) {
                    document.getElementById("search-info").textContent = "Found " + counter + " artworks for “" + value + "”";
                }

            }

            //put save to local storage at the end in order to make loading faster
            for (let save of toSave) {
                localStorage[save.entry] = JSON.stringify(save.info);
            }

        }

        function addObjToHtml(info) {
            let objID = info['objectID'];
            let hrefConf = "./config.html?objectID=" + objID;
            let imageSrc = info['primaryImageSmall'];
            let imageIDArray = imageSrc.split("/");
            let imageID = imageIDArray[imageIDArray.length - 1];
            let artist = info['artistDisplayName'];
            let title = info['title'];
            let date = info['objectDate'];


            //const elem = document.createElement("div");
            //elem.className = "thumb";
            let gallery = document.getElementById("gallery");
            gallery.innerHTML +=
                "<div class=thumb" + ">" +
                "<a href=" + hrefConf + " id=" + objID + ">" +
                "<img src='" + imageSrc + "' alt='' id='" + imageID + "'>" +
                "<div class='museum-label'>" +
                "<span class='artist'>" + artist + "</span>" +
                "<span class='title'>" + title + ', ' + "</span>" +
                "<span class='date'>" + date + "</span>" +
                "</div>" +
                "</a>" +
                "</div>";

        }

        function removeFromHtml() {
            let gallery = document.getElementById("gallery");
            gallery.innerHTML = "";
        }
    