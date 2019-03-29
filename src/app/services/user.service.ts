import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity;
	public token;
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	signUp(userToLogin, gethash = false):Observable<any>{

		userToLogin.gethash = gethash;

		let params = JSON.stringify(userToLogin);

		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'login', params, {headers: headers});
	}

	registerUser(userToRegister):Observable<any>{

		let params = JSON.stringify(userToRegister);

		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'register', params, {headers: headers});
	}

	updateUser(userToUpdate):Observable<any>{

		let params = JSON.stringify(userToUpdate);

		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		});

		return this._http.put(this.url+'update-user/'+userToUpdate._id, params, {headers: headers});
	}

	getIdentity(){

		let identity = JSON.parse(localStorage.getItem('identity'));
		if (identity != "undefined") {
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;

	}
	getToken(){
		let token = localStorage.getItem('token');
		if (token !=  "undefined") {
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
}
