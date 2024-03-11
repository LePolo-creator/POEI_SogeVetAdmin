import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Category } from 'src/app/categories/model/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product? : Product;
  categories : Category[] = [];

  


  editProduct(form : NgForm) {
    console.log(form)
    this.ProductService.editProduct(this.product!.id, form.value.name,form.value.description,form.value.size,form.value.unitPrice,form.value.color,form.value.quantity,form.value.categoryName,form.value.images);
    this.router.navigate(['/products'])
  }
  constructor(private activatedRoute : ActivatedRoute, 
    private ProductService : ProductsService, 
    private router : Router,
    private categoriesService : CategoriesService) {}

  ngOnInit(): void {

    this.categoriesService.categoriesUpdated.subscribe(categories=>this.categories=categories)
    this.categoriesService.getCategories();

    this.activatedRoute.params.subscribe( params => {
      const id = params["id"];
      this.ProductService.getProductById(id).subscribe(p => this.product = p );  // gérer le cas où l'API répond "ok : false"
    })
  }
  
}
