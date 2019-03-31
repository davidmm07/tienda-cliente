import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { Category } from '../models/category';


@Component({
	selector:'menu',
	templateUrl:'../views/menu.html',
	providers:[UserService, StoreService]
})
//Menu
export class MenuComponent implements OnInit {
	
	public titulo:string;
	public categories: Category[];
	public identity;
	public token;
	public url:string;
	public alertMessage;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _storeService: StoreService,
	) {
		this.titulo = 'Categorias';
		this.identity =this._userService.getIdentity();
		this.token =this._userService.getToken();
		this.url = GLOBAL.url;


	}
	ngOnInit(){
		console.log('menu reemplaza a category-list.component.ts cargado');

		//Conseguir el listado de Categorias
	}

}
