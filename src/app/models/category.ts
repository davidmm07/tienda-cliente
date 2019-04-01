import { Sublevel } from './sublevel';

export class Category{
	constructor(
		public _id: string,
		public name: string,
		public sublevels: Sublevel
	){}
}