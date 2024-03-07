import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: "", component:ProductsComponent},
  { path: "products", component:ProductsComponent},
  { path: "categories", component:CategoriesComponent},
  { path: "users", component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
