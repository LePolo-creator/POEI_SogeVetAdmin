import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  
  products : Product[]=[];
  productToDisplay : Product[]=[];
  filteredProducts? : Product[];

  productSubscription? : Subscription;
  
  
  constructor( private productService : ProductsService ) {}


  filterProduct(keyword : string){
    console.log(keyword);
    this.filteredProducts = this.filteredProducts?.filter(p=>
      p.name.toLowerCase().includes(keyword.toLowerCase()) ||
      p.description.toLowerCase().includes(keyword.toLowerCase())||
      p.categoryName.toLowerCase().includes(keyword.toLowerCase())||
      p.id==Number(keyword)
      )
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ngOnInit(): void {
    this.productService.getProducts();

     this.productSubscription = this.productService.productsUpdated.subscribe(
      p => { 
        this.products = p,
        this.productToDisplay = p;
        }
     );
  }
  


}
