import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginConnectionComponent } from './login-connection/login-connection.component';

const routes: Routes = [{path:"", component:LoginConnectionComponent, pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
