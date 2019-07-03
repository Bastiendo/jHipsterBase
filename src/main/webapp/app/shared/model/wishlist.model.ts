import { Moment } from 'moment';

export interface IWishlist {
  id?: number;
  name?: string;
  date?: Moment;
}

export class Wishlist implements IWishlist {
  constructor(public id?: number, public name?: string, public date?: Moment) {}
}
