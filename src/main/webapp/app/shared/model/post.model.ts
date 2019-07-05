import { Moment } from 'moment';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: Moment;
  like?: number;
}

export class Post implements IPost {
  constructor(public id?: number, public title?: string, public content?: string, public date?: Moment, public like?: number) {}
}
