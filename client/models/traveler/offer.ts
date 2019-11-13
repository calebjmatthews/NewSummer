export default class Offer implements OfferInterface {
  id: number;
  label: string;
  price: number;
  sold: boolean;
  type: string;
  item: any;
  travelerRole: string;

  constructor(offer: OfferInterface) {
    Object.assign(this, offer);
  }
}

interface OfferInterface {
  id: number;
  label: string;
  price: number;
  sold: boolean;
  type: string;
  item: any;
  travelerRole: string;
}
