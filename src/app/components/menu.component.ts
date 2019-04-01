import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { NavService } from '../services/nav.service';
import { Category } from '../models/category';


@Component({
	selector:'menu',
	templateUrl:'../views/menu.html',
	providers:[UserService, StoreService, NavService]
})
//Menu
export class MenuComponent implements  AfterViewInit{
	@ViewChild('appDrawer') appDrawer: ElementRef;	
	public titulo:string;
	public categories: Category[];
	public identity;
	public token;
	public url:string;
	public alertMessage;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private userService: UserService,
		private storeService: StoreService,
		private navService: NavService
	) {
		this.titulo = 'Categorias';
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;


	}

	getCategories(){

		this.storeService.get('categories').subscribe(
			response =>{
				this.categories = response.categories;
			},error =>{
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
		//Conseguir el listado de Categorias
	}

	ngOnInit(){
		console.log('menu reemplaza a category-list.component.ts cargado'+this.identity.name);
		

	}
	ngAfterViewInit() {
		this.navService.appDrawer = this.appDrawer;
		this.getCategories();

	}	

}
