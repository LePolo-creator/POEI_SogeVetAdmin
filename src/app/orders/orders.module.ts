import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { DetailedOrderComponent } from './detailed-order/detailed-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListOrdersComponent,
    DetailedOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule
  ]
})
export class OrdersModule { }
