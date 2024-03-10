import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditCategoryComponent } from '../categories/edit-category/edit-category.component';

const routes: Routes = [
  {path:"", component:ListUsersComponent, pathMatch:"full"},
  {path:"edit/:id", component:EditCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
