import {autoIncrement} from '../instances/auto_increment';

export default class Offer{
  constructor(label, price, sold, type, item, travelerName, id = null) {
    this.label = label;
    this.price = price;
    this.sold = sold;
    this.type = type;
    this.item = item;
    this.travelerName = travelerName;
    if (id == null) {
      this.id = autoIncrement.genId('offer');
    }
    else {
      this.id = id;
    }
  }
}
