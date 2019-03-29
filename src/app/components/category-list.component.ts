import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Category } from '../models/category';


@Component({
	selector:'category-list',
	templateUrl:'../views/category-list.html',
	providers:[UserService]
})

export class CategoryListComponent implements OnInit {
	
	public titulo:string;
	public category: Category[];
	public identity;
	public token;
	public url:string;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) {
		this.titulo = 'Categorias';
		this.identity =this._userService.getIdentity();
		this.token =this._userService.getToken();
		this.url = GLOBAL.url;

	}
	ngOnInit(){
		console.log('category-list.component.ts cargado');

		//Conseguir el listado de Categorias
	}
}
