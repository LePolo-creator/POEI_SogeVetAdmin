import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/order';
import { Subscription } from 'rxjs';
import { IOrderToDisplay } from '../model/iorder-to-display';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{

  constructor( private orderService : OrdersService, private userService : UsersService){}
  orders : Order[] = []
  filteredOrders? : Order[]
  ordersToDisplay : IOrderToDisplay[] = []
  orderSubscription? : Subscription

  filterOrders(keyword : string){
    //
  }




  ngOnInit(): void {
    this.orderService.getOrders();

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
