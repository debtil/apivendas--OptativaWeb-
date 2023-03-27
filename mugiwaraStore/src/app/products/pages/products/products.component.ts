import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Product from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private router:Router) { 
    this.form_cadastrar = this.formBuilder.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.listarTodos());
  }

  listarTodos(){
    this.productService.listarTodos().subscribe(resultado => {
      this.products = resultado
    })
  }

  cadastrar(){
    this.productService.adicionarProduto(this.form_cadastrar.value).subscribe(resultado =>{
      console.log("produto salvo" + resultado);
      window.location.reload();
    })
  }

  editar(product: Product){
    this.router.navigate(['product-detail', product.id]);
  }

  excluir(product: Product){
    this.productService.excluirProduto(product.id).subscribe(resultado => {
      console.log(resultado);
      window.location.reload();
    }, 
      error => {
        console.log(error); 
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      return false;
    }else{
      this.cadastrar();
      return true;
    }
  }
}
