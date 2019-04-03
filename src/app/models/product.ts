import { Sublevel } from './sublevel';

export class Product{
	constructor(
		public quantity: number,
		public price: string,
		public available: boolean,
		public sublevel_id: Sublevel,
		public name: string,
		public _id: string
	){}
}