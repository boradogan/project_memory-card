export class CardClass {
  constructor(name, src){
    this.isClicked = false;
    this.name = name;
    this.src = src;
    this.id = crypto.randomUUID();
  }
}