import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import Product from '../models/Product';
import { AuthService } from 'src/app/users/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL: string = 'http://localhost:3333';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  listarTodos(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<Product[]>(`${this.apiURL}/products`, {headers: headers});
  }

  
  listarProduto(id: string){
    return this.http.get<Product>(`${this.apiURL}/products/${id}`);
  }

  
  adicionarProduto(product: Product){
    return this.http.post(`${this.apiURL}/products/`, product);
  }
  
  editarProduto(id: string, product: Product){
    return this.http.put(`${this.apiURL}/products/${id}`, product);
  }
  
  excluirProduto(id: string){
    return this.http.delete(`${this.apiURL}/products/${id}`);
  }
}
