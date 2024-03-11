import { Product } from "src/app/products/model/product";

export class Category {
  public get products(): Array<Product> {
    return this._products;
  }
  public set products(value: Array<Product>) {
    this._products = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  constructor(
    private _id: number,
    private _name: string,
    private _products: Array<Product>
  ){}
}
