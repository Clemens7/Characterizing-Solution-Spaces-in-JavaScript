export class artDocumentContainer {
  constructor(containerID = 'gallery') {
      this.container = document.getElementById(containerID);
      if (!this.container) 
  }
  clear() {
      this.container.innerHTML = '';
  }





  addArtToDocument(artElem) {
      this.container.innerHTML +=
          `<div class="thumb">
    <a href="config.html?objectID=${artElem.objectID}&printSize=M&frameStyle=natural&frameWidth=40&matColor=mint&matWidth=55">
      <img src="${artElem.primaryImageSmall}" alt="${artElem.title}">
      <div class="museum-label">
        <span class="artist">${artElem.artistDisplayName}</span>
        <span class="title">${artElem.title}</span>,
        <span class="date">${artElem.objectDate}</span>
      </div>
    </a>
  </div>`
  }
  


  

  
}


export function addStuffToHtml(addTheseImages, nameOfElem = 'gallery') {
  const artContainer = new artDocumentContainer(nameOfElem);
  artContainer.clear();
  for (let oneImage of addTheseImages) {
      artContainer.addArtToDocument(oneImage);
  }
}