import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService]
})
export class AppComponent implements OnInit{
  public title = 'Store-Rappi';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string; 

  constructor(
    private _userService: UserService,
    private _router: Router
  ){
    this.user = new User('','', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('','', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url;
  } 
  

  public onSubmit(){
    //Conseguir los datos del usuario identificado 
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {
          alert('el usuario no está correctamente identificado');
        }
        else{
          // Elemento en el localstorage 
          localStorage.setItem('identity', JSON.stringify(identity));
          this._userService.signUp(this.user, true).subscribe(
            response =>{
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {
                alert("el token no se ha generado correctamente");
              }
              else{
                // Elemento en el localstorage para tener token disponible;
                localStorage.setItem('token', JSON.stringify(token));
                this.user = new User('','', '', '', '', 'ROLE_USER', '');
              }

          }, error => {

          });
          // Conseguir el token para enviarselo a cada petición http

        }
      },
      error => {
        if (error != null) {
          this.errorMessage = error.error.message;          
        }
      }
      );
  }

  public onSubmitRegister(){
    console.log(this.user_register);
    this._userService.registerUser(this.user_register).subscribe(
      response =>{
        let user = response.user;
        this.user_register = user;

        if (!user._id) {
          this.alertRegister = 'error al registrarse';
        }
        else{
          this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+ this.user_register.email;
          this.user_register = new User('','', '', '', '', 'ROLE_USER', '');
        }
      },error =>{
         if (error != null) {
         this.alertRegister = error.error.message;          
         console.log(this.errorMessage);          
        }
      });
  }

  ngOnInit(){

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);

  }

  logout(){
    localStorage.removeItem('identity'); // eliminar elementos en concreto
    localStorage.removeItem('token');
    localStorage.clear(); // elimina todo
    this.identity = null;
    this.token = null;
    this._router.navigate(["/"]);
  }
}
