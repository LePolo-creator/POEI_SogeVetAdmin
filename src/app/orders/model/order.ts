import { OrderItems } from "./order-items";

export class Order {
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }
    public get orderItems(): Array<OrderItems> {
        return this._orderItems;
    }
    public set orderItems(value: Array<OrderItems>) {
        this._orderItems = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    constructor(
        private _id: number,
        private _status: string,
        private _address: string,
        private _userId: number,
        private _orderItems: Array<OrderItems>
    ){ }
}
