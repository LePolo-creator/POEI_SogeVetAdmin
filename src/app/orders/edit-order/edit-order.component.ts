import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order? : Order

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService : OrdersService,
    private router : Router
  ) {}

  editOrder(form : NgForm){
    this.orderService.editOrder(this.order!.id, form.value.status, form.value.address)
    this.router.navigate(['/orders'])
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.orderService.getOrderById(id).subscribe(order => this.order = order)
    })
  }
  
}
