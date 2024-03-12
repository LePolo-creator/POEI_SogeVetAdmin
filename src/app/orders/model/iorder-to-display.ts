import { OrderItems } from "./order-items";

export interface IOrderToDisplay {
    id : number,
    status: string,
    address: string,
    userId : number,
    orderItems : Array<OrderItems>,
    totalPrice: number,
    totalQuantity: number
}
