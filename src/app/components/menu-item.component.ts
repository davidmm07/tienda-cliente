import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Category} from '../models/category';
import {Sublevel} from '../models/sublevel';
import {Router} from '@angular/router';
import {NavService} from '../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'menu-item',
  templateUrl: '../views/menu-item.html',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})

export class MenuItemComponent implements OnInit {

	expanded: boolean;
	@HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
	@Input() item: Sublevel;
	@Input() depth: number;		
	constructor(
		public navService: NavService,
		public router: Router
		) {
		if (this.depth === undefined) {
			this.depth = 0;
		}	
		// code...
	}

	ngOnInit(){
		this.navService.currentUrl.subscribe((url:string) => {
			console.log(url);
			console.log(this.item);
			// routing de productos por subnivel
			 if (this.item._id && url) {
			// 	// console.log(`Checking '/${this.item.route}' against '${url}'`);
			// 	this.expanded = url.indexOf(`/${this.item.route}`) === 0;
			 	this.expanded = false;
			 	this.ariaExpanded = this.expanded;
			// 	// console.log(`${this.item.route} is expanded: ${this.expanded}`);
			 }
		});

	}

	onItemSelected(item: Sublevel) {
		if (!this.validateSublevels(item)) {
			//this.router.navigate([item.route]);  
			//pendiente routing
			this.navService.closeNav(); 
			console.log('no tiene subniveles');
		}
		if (this.validateSublevels(item)) {
			this.expanded = !this.expanded;
			console.log('tiene subniveles');
		}
	}
	validateSublevels(item){
		if (!item.sublevels || !Object.keys(item.sublevels).length) {
			//this.router.navigate([item.route]);  
			//pendiente routing
			return false;
		}
		if (item.sublevels && Object.keys(item.sublevels).length) {
			return true;
		}		
	}
		
}