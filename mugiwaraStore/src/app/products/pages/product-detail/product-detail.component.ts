import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Product from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  form_editar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form_editar = this.formBuilder.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
    });

    let id = (String(this.route.snapshot.paramMap.get('id')));
    this.productService.listarProduto(id).subscribe(
      resultado => {
        this.product = resultado;
        this.form_editar = this.formBuilder.group({
          name: [this.product.name, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          quantity: [this.product.quantity, [Validators.required]]
        });
      }
    );
   }

  ngOnInit(): void {
  }
  
  get errorControl(){
    return this.form_editar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_editar.valid){
      return false;
    }else{
      this.editar();
      return true;
    }
  }

  editar(){
    this.productService.editarProduto(this.product.id, this.form_editar.value).subscribe(resultado =>{
      console.log("produto editado");
      this.router.navigate(['products']);
    });
  }
}
