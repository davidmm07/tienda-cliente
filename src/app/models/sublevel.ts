
export class Sublevel{
	constructor(
		public _id: string,
		public name: string,
		public sublevels: Sublevel
	){}
}