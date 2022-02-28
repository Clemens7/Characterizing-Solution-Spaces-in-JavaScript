export class artDocumentContainer {
  constructor(containerID = 'gallery') {
      this.container = document.getElementById(containerID);
      if (!this.container) 
  }
  clear() {
      this.container.innerHTML = '';
  }





  
  


  

  
}


export function addStuffToHtml(addTheseImages, nameOfElem = 'gallery') {
  const artContainer = new artDocumentContainer(nameOfElem);
  artContainer.clear();
  for (let oneImage of addTheseImages) 
}