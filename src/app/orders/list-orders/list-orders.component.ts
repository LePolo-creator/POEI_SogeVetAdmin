import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/order';
import { Subscription } from 'rxjs';
import { IOrderToDisplay } from '../model/iorder-to-display';
import { UsersService } from 'src/app/users/services/users.service';
import { OrderItems } from '../model/order-items';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{

  constructor( private orderService : OrdersService, private userService : UsersService){}
  orders : Order[] = []
  orderItems? : OrderItems[] 
  filteredOrders? : IOrderToDisplay[]
  ordersToDisplay : IOrderToDisplay[] = []
  orderSubscription? : Subscription

  filterOrders(status?:string, keyword? : string,  min?: number, max? : number ){
    this.filteredOrders = this.ordersToDisplay
    if (status) {
      this.filteredOrders = this.filteredOrders.filter(o => o.status == status)
    }
    if (max) {
       this.filteredOrders = this.filteredOrders.filter(o => o.totalPrice <= +max);
    }
    if (min) {
       this.filteredOrders = this.filteredOrders.filter(o => o.totalPrice >= +min);
    }
  }



  ngOnInit(): void {
    this.orderService.getOrders();
    this.userService.getUsers();

    this.orderSubscription = this.orderService.ordersUpdated.subscribe(
     o => { 
        this.orders = o
        this.orders.forEach(order => {
        this.ordersToDisplay?.push(this.orderService.convertToDisplay(order))
      });
       }
    );
  }
}
