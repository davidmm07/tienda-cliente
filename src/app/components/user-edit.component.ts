import { Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import { GLOBAL } from '../services/global';

@Component({
	selector:'user-edit',
	templateUrl: '../views/user-edit.html',
	providers:[UserService]
})

export class UserEditComponent implements OnInit {
	
	public titulo: string;
	public user: User;
	public identity;
	public token;
	public alertMessage;
	public filesToUpload:Array<File>;
	public url:string;

	constructor(
		private _userService: UserService
		) {
		this.titulo = 'Actualizar datos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = GLOBAL.url;
	};

	ngOnInit(){
		console.log('user edit component cargado');
	}

	onSubmit(){
		this._userService.updateUser(this.user).subscribe(
			response =>{
				if (!response.user) {
					this.alertMessage = 'El usuario no se ha actualizado';
				}else{
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.name;
					if (!this.filesToUpload) {
						// redireccion
					}
					else{
						this.makeFileRequest(this.url+'upload-img-user/'+this.user._id,[], this.filesToUpload)
						.then((result:any) =>{
							this.user.image = result.image;
							localStorage.setItem('identity', JSON.stringify(this.user));
							let image_path = this.url+'get-image-file/'+this.user.image;
							document.getElementById("image-logged").setAttribute('src',image_path);
						});
					}
					this.alertMessage = 'Datos actualizados correctamente';
				}
			},error => {
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
	}
	//Recoge los datos del archivo
	fileChangeEvent(fileinput: any){
		this.filesToUpload = <Array<File>> fileinput.target.files;
		console.log(this.filesToUpload);

	}
	makeFileRequest(url: string, params:Array<string>, files: Array<File>){
		var token = this.token;

		return new Promise((resolve,reject)=>{
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++) {
				formData.append('image',files[i],files[i].name);
			}
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}

				}
			};
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);

		});
	}
} 