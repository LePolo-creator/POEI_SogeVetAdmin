import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category? : Category
  

  editCategory(form : NgForm) {
    this.categoryService.editCategory(this.category!.id, form.value.name);
    this.router.navigate(['/categories'])
  }
  constructor(private activatedRoute : ActivatedRoute, private categoryService : CategoriesService, private router : Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params["id"];
      this.categoryService.getCategoryById(id).subscribe(c => this.category = c );  // gérer le cas où l'API répond "ok : false"
    })
  }

}
