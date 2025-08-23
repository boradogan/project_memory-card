export class CardClass {
  constructor(name){
    this.isClicked = false;
    this.name = name;
    this.id = crypto.randomUUID();
  }
}