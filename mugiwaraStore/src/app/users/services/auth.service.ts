import { Injectable } from '@angular/core';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  mockUsuarioLogin(dados:any){
    let user = new User();
    let token: string
    user = dados.user;
    token = dados.token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUsuario(): User{
    let user = new User();
    user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  getToken():string{
    return localStorage.getItem('token');
  }
}
