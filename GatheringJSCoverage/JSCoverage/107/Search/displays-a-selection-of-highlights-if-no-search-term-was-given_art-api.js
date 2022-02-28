export async function retriveImagesFromAPI(IDs, arrayLen) {
    let urls = [];
    for (let i = 0; i < arrayLen; i++) {
      urls[i] = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${IDs[i]}`;
    }
    try {
      var data = await Promise.all(
        urls.map(
          url =>
            fetch(url).then(
              (response) => response.json()
            ).then(
            )));

      return (data)

    }}

  export 