import { Component, OnInit, Input, AfterViewInit,IterableDiffers, OnChanges} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { NavService } from '../services/nav.service';
import { Sublevel } from '../models/sublevel';
import { Product } from '../models/product';


@Component({
	selector:'product-list',
	templateUrl:'../views/product-list.html',
	providers:[UserService, StoreService, NavService]
})
//Menu
export class ProductListComponent implements OnInit, OnChanges{

	@Input() sublevelnotchild: Sublevel;	
	public titulo:string;
	public products: Product[];
	public identity;
	public token;
	public url:string;
	public alertMessage; 
	public sublevelchange: any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private userService: UserService,
		private storeService: StoreService,
		private navService: NavService,
		private differs: IterableDiffers
	) {
		this.titulo = 'Productos del subnivel: ';
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;


	}

	getProducts(){
		this.titulo = 'Productos del subnivel: '+ this.sublevelchange.name;
		if (this.sublevelchange._id) {
		this.storeService.get('products/'+this.sublevelchange._id).subscribe(
			response =>{
				this.products = response.products;
			},error =>{
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
		}
		else{
			console.log("Error");
		}

		//Conseguir el listado de Categorias
	}

	ngOnInit(){
		console.log('product-list.component.ts cargado'+this.identity.name);
		

	}

	ngOnChanges(changes) {
		if (changes['sublevelnotchild']) {
			// code...
			this.sublevelchange = this.sublevelnotchild
		}
		console.log(this.sublevelchange);
		this.getProducts();

	}
}
