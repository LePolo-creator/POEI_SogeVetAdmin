import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/order';
import { OrderItems } from '../model/order-items';

@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.css']
})
export class DetailedOrderComponent {
  order? : Order
  orderItems? : OrderItems[]
  constructor(
    private activatedRoute : ActivatedRoute,
    private orderService : OrdersService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params["id"];
      this.orderService.getOrderById(id).subscribe(o => {
        this.order = o;
        this.orderItems = o.orderItems
        
      }
        )
    })
}
}
