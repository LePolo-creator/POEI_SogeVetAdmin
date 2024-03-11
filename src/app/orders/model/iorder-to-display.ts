import { OrderItems } from "./order-items";

export interface IOrderToDisplay {
    id : number,
    status: string,
    address: string,
    user : string,
    orderItems : Array<OrderItems>,
    totalPrice: number,
    totalQuantity: number
}
