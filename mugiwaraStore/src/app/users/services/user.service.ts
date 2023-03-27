import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = "http://localhost:3333";
  constructor(private http: HttpClient) { }


  criarSessao(user: User){
    return this.http.post(`${this.apiURL}/sessions`, user);
  }

  criarUsuario(user: User){
    return this.http.post(`${this.apiURL}/users`, user);
  }
}
