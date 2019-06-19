export default class Offer{
  constructor(labelOrOffer, price = null, sold = null, type = null,
    item = null, travelerName = null) {
    this.id = null;
    if (typeof(labelOrOffer) == 'object' && labelOrOffer != null) {
      this.label = labelOrOffer.label;
      this.price = labelOrOffer.price;
      this.sold = labelOrOffer.sold;
      this.type = labelOrOffer.type;
      this.item = labelOrOffer.item;
      this.travelerName = labelOrOffer.travelerName;
    }
    else {
      this.label = labelOrOffer;
      this.price = price;
      this.sold = sold;
      this.type = type;
      this.item = item;
      this.travelerName = travelerName;
    }
  }
}
