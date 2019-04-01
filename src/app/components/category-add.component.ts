import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { Category } from '../models/category';
import { Sublevel } from '../models/sublevel';



@Component({
	selector:'category-add',
	templateUrl:'../views/category-add.html',
	providers:[UserService, StoreService]
})

export class CategoryAddComponent implements OnInit {
	
	public titulo:string;
	public category: Category;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _storeService: StoreService
	) {
		this.titulo = 'Crear Nueva Categoria';
		this.identity =this._userService.getIdentity();
		this.token =this._userService.getToken();
		this.url = GLOBAL.url;
		this.category = new Category('','',null);

	}
	ngOnInit(){
		console.log('category-add.component.ts cargado');

	}
	onSubmit(){
		this._storeService.post('categories',this.category).subscribe(
			response =>{

				if (!response.category) {
					this.alertMessage = 'Error en el servidor';
				}
				else{
					this.alertMessage = 'La categoría se ha creado correctamente';
					this.category = response.category;
					this._router.navigate(['/edit-category',response.category._id]);
				}

			},error =>{
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
	}
}
