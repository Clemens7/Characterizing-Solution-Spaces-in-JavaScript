export default class Artwork {
  constructor(objectID, queryParams) {
    this.objectID = objectID;
    this.printSize = queryParams.get('printSize') ?? 'M';
    this.frameStyle = queryParams.get('frameStyle') ?? 'natural';
    this.frameWidth = queryParams.get('frameWidth') ?? '40';
    this.matColor = queryParams.get('matColor') ?? 'mint';
    this.matWidth = queryParams.get('matWidth') ?? '55';
  }
};