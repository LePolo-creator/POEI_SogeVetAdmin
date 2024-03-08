export class Product {
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get size(): number {
        return this._size;
    }
    public set size(value: number) {
        this._size = value;
    }
    public get unitPrice(): number {
        return this._unitPrice;
    }
    public set unitPrice(value: number) {
        this._unitPrice = value;
    }
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
    public get categoryName(): string {
        return this._categoryName;
    }
    public set categoryName(value: string) {
        this._categoryName = value;
    }
    public get images(): string[] {
        return this._images;
    }
    public set images(value: string[]) {
        this._images = value;
    }
    constructor(
        private _id: number,
        private _name: string,
        private _description: string,
        private _size: number,
        private _unitPrice: number,
        private _color: string,
        
        private _quantity: number,
        private _categoryName: string,
        private _images: string[]

      ){}

}
