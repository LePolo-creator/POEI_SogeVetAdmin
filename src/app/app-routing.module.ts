import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';


const routes: Routes = [
  { path: "categories",
    loadChildren: () => import("./categories/categories.module").then(m => m.CategoriesModule),canActivate:[authGuard]},
    { path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule),canActivate:[authGuard]},
    { path: "products",
    loadChildren: () => import("./products/products.module").then(m => m.ProductsModule),canActivate:[authGuard]},
    { path: "orders",
    loadChildren: () => import("./orders/orders.module").then(m => m.OrdersModule),canActivate:[authGuard]},
    { path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
