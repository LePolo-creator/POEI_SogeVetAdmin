import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/orders/model/order';
import { IOrderToDisplay } from 'src/app/orders/model/iorder-to-display';
import { OrdersService } from 'src/app/orders/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  user? : User
  orders? : Order[]
  ordersToDisplay : IOrderToDisplay[] = []


  constructor(
    private userService : UsersService,
    private activatedRoute : ActivatedRoute,
    private orderService : OrdersService
  ){}

  ngOnInit(): void {
    this.userService.getUsers();
    this.orderService.getOrders();

    this.activatedRoute.params.subscribe( params => {
      const id = params["id"];
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
        this.orders = user.orders;
        console.log(this.orders)
        this.orders.forEach(order => {
          this.ordersToDisplay.push(this.orderService.convertToDisplay(order))
        })
        console.log(this.ordersToDisplay)
      })
    })
}

}
