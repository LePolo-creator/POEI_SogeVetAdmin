import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products : Product[]=[];
  productsUpdated = new Subject<Product[]>()

  baseUrl = "https://localhost:7265/api/products/";

  


  constructor(private http : HttpClient) { }

  getProducts(){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.get<Product[]>(this.baseUrl, options).subscribe(
      products => {
        this.products = products;
        //console.log(this.products);
        this.productsUpdated.next([...this.products]);
      }
    )
  }

  getProductById(id : number) : Observable<Product>{
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    return this.http.get<Product>(this.baseUrl+id, options);
  }

  addProduct(name: string,description : string,size : number, unitPrice : number,color : string, quantity : number,categoryName : string, images : string[]){
    // console.log(JSON.stringify({
    //   Name: name,
    //   Description : description,
    //   Size : size,
    //   UnitPrice : unitPrice,
    //   Color : color,
    //   Quantity : quantity,
    //   CategoryName : categoryName,
    //   Images : images
    // }))
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.post<Product>(this.baseUrl, JSON.stringify({
      Name: name,
      Description : description,
      Size : size,
      UnitPrice : unitPrice,
      Color : color,
      Quantity : quantity,
      CategoryName : categoryName,
      Images : images
    }), options).subscribe(product => {
      this.products.push(product)
      this.productsUpdated.next([...this.products])
    })
  }

  deleteProduct(id: number) { 
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.delete(this.baseUrl+id, options).subscribe(()=>{
      this.products = this.products.filter(p=>p.id != id);

      
      this.productsUpdated.next([...this.products])

    })
  }



  editProduct(id: number,name: string,description : string,size : number, unitPrice : number,color : string, quantity : number,categoryName : string, images : string[]){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.put<Product>(this.baseUrl+id, JSON.stringify({
      Id : id,
      Name: name,
      Description : description,
      Size : size,
      UnitPrice : unitPrice,
      Color : color,
      Quantity : quantity,
      CategoryName : categoryName,
      Images : images
    }), options).subscribe(product => {
      this.products = this.products.map(p => p.id === product.id ? product : p)
    })
  }




}
