import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { DetailedOrderComponent } from './detailed-order/detailed-order.component';

const routes: Routes = [
  {path:"", component:ListOrdersComponent, pathMatch:"full"},
  {path:":id", component:DetailedOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
