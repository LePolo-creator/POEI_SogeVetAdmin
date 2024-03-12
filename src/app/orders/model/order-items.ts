export class OrderItems {
    public get totalPrice(): number {
        return this._totalPrice;
    }
    public set totalPrice(value: number) {
        this._totalPrice = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }
    public get orderId(): number {
        return this._orderId;
    }
    public set orderId(value: number) {
        this._orderId = value;
    }
    public get unitPrice(): number {
        return this._unitPrice;
    }
    public set unitPrice(value: number) {
        this._unitPrice = value;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
    constructor(
        private _id: number,
        private _productId: number,
        private _orderId: number,
        private _unitPrice: number,
        private _quantity: number,
        private _totalPrice: number
    ) {}
    
}
