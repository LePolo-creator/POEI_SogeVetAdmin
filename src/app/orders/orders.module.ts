import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { DetailedOrderComponent } from './detailed-order/detailed-order.component';


@NgModule({
  declarations: [
    ListOrdersComponent,
    DetailedOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
