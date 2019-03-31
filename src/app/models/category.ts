import { Sublevel } from './sublevel';

export class Category{
	constructor(
		public name: string,
		public sublevels: Sublevel
	){}
}