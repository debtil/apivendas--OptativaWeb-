import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/pages/product-detail/product-detail.component';
import { ProductsComponent } from './products/pages/products/products.component';
import { CreateComponent } from './users/pages/create/create.component';
import { SessionComponent } from './users/pages/session/session.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "product-detail/:id",
    component: ProductDetailComponent
  },
  {
    path: "create-user",
    component: CreateComponent
  },
  {
    path: "session",
    component: SessionComponent
  },
  {
    path: "**",
    redirectTo: "/session",
  },
  {
    path: "",
    redirectTo: "/session",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
