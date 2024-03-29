import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { Subject } from 'rxjs';
import { IOrderToDisplay } from '../model/iorder-to-display';
import { UsersService } from 'src/app/users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService  {

  orders : Order[] = []
  ordersUpdated = new Subject<Order[]>()     

  baseUrl="https://localhost:7265/api/orders/";
  

  constructor(private http: HttpClient, private userService : UsersService) { }

  convertToDisplay(order : Order) : IOrderToDisplay {
    const userName = this.userService.getUserFullName(order.userId)
    console.log(userName)   // NE MARCHE PAS
    return {
      id: order.id,
      address : order.address,
      status : order.status,
      userId : order.userId ,    // serait mieux d'avoir le nom
      orderItems : order.orderItems,
      totalPrice : this.getTotalPrice(order.id),
      totalQuantity: this.getTotalQuantity(order.id)
    } as IOrderToDisplay
  }

  getTotalPrice(id : number){
    const order = this.orders.find( o => o.id == id)
    let totalPrice = 0
    order?.orderItems.forEach(item => {
      totalPrice += item.quantity * item.unitPrice
    })
    return totalPrice
  }
  
  
  getTotalQuantity(id : number){
    const order = this.orders.find( o => o.id == id)
    let totalQuantity = 0
    order?.orderItems.forEach(item => {
      totalQuantity += item.quantity 
    })
    return totalQuantity
  }


  getOrders(){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.get<Order[]>(this.baseUrl, options).subscribe(
      orders => {
        this.orders = orders;
        this.ordersUpdated.next([...this.orders]);
      }
    )
  }


  getOrderById(id: number){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    return this.http.get<Order>(this.baseUrl+id, options)
  }

  editOrder(id: number, status: string, address: string){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.put<Order>(this.baseUrl+id, JSON.stringify({
      Id : id,
      status: status,
      address : address
    }), options).subscribe(order => {
      this.orders = this.orders.map(o => o.id === order.id ? order : o)
    })
  }
}
