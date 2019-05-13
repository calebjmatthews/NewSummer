export default class Economy {
  constructor() {
    this.fieldsBought = 0;
    this.baseFieldPrice = 100;
    this.currentFieldPrice = this.genFieldPrice();

    this.intermediateSpend = null;
  }
  getFieldPrice() {
    return this.currentFieldPrice;
  }
  genFieldPrice() {
    let newPrice =
      this.baseFieldPrice * (Math.pow(1.6, this.fieldsBought));
    newPrice = newPrice * (1 + (Math.random()*0.4 - 0.2));
    return parseFloat(newPrice.toFixed(2));
  }
  recordBoughtField() {
    this.fieldsBought++;
    this.currentFieldPrice = this.genFieldPrice();
  }
}
