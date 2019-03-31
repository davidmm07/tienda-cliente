import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserService} from './user.service'
import { GLOBAL } from './global';


@Injectable()
export class StoreService{
	public identity;
	public token;
	public url: string;
	private httpOptions;	

	constructor(
		private http: HttpClient,
		private _userService:UserService){
		this.url = GLOBAL.url;
		this.token = this._userService.getToken();
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization':this.token
			}),
		};
	}
    get(endpoint):Observable<any> {
        return this.http.get(this.url  + endpoint, this.httpOptions).pipe(
          catchError(this.handleError),
        );
    }

    post(endpoint, element):Observable<any> {
        return this.http.post(this.url  + endpoint, element, this.httpOptions).pipe(
          catchError(this.handleError),
        );
    }

    put(endpoint, element,id):Observable<any> {
        return this.http.put(this.url  + endpoint + '/' + id, element, this.httpOptions).pipe(
          catchError(this.handleError),
        );
    }

    delete(endpoint, element):Observable<any> {
        return this.http.delete(this.url  + endpoint + '/' + element.Id, this.httpOptions).pipe(
          catchError(this.handleError),
        );
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError({
        status: error.status,
        message: 'Something bad happened; please try again later.',
      });
    };

}