import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/categories/model/category';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  categories : Category[] = [];

  constructor(
    private productService : ProductsService,
    private router : Router,
    private categoriesService : CategoriesService
  ){}
  

  addProduct(f:NgForm){
    this.productService.addProduct(f.value.name,f.value.description,f.value.size , f.value.unitPrice,f.value.color, f.value.quantity,f.value.categoryName, f.value.images.split(','))
    this.router.navigate(['/products']);
  }

ngOnInit(): void {
    this.categoriesService.categoriesUpdated.subscribe(c=>this.categories=c)
    this.categoriesService.getCategories();
  }


}
