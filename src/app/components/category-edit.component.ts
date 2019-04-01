import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { Category } from '../models/category';
import { Sublevel } from '../models/sublevel';



@Component({
	selector:'category-edit',
	templateUrl:'../views/category-add.html',
	providers:[UserService, StoreService]
})

export class CategoryEditComponent implements OnInit {
	
	public titulo:string;
	public category: Category;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	public isEdit;
	public idCategory;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _storeService: StoreService
	) {
		this.titulo = 'Editar Categoria';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.category = new Category('','',null);
		this.isEdit = true;

	}
	ngOnInit(){
		console.log('category-edit.component.ts cargado');
		this.getCategory();

	}

	getCategory(){
		this._route.params.forEach((params: Params)=>{
			this.idCategory = params['id'];
			this._storeService.get('categories/' + this.idCategory).subscribe(
				response =>{
					if (!response.categories) {
						this._router.navigate(['/']);
					}
					else{
						this.category = response.categories;
					}
				},error => {
					if (error != null) {
						this.alertMessage = error.error.message;          
					}					
				})
		});
	}

	onSubmit(){
		this._storeService.put('categories',this.category,this.idCategory).subscribe(
			response =>{

				if (!response.category) {
					this.alertMessage = 'Error en el servidor';
				}
				else{
					this.alertMessage = 'La categoría se ha actualizado correctamente';
					this.category = response.category;
				}

			},error =>{
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
	}
}
