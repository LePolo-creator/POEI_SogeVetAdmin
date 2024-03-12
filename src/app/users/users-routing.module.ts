import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {path:"", component:ListUsersComponent, pathMatch:"full"},
  {path:"edit/:id", component:EditUserComponent},
  {path:":id", component:UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
