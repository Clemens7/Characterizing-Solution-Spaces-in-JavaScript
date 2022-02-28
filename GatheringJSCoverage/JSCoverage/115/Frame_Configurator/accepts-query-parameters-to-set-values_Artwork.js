export default class Artwork {
  constructor(objectID, queryParams) {
    this.objectID = objectID;
    this.printSize = queryParams.get('printSize') }
};