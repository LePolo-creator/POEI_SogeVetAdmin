import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private categoryService: CategoriesService, private router: Router) {}

  addCategory(form : NgForm) {
    this.categoryService.addCategory(form.value.name);
    this.router.navigate(['/categories'])
  }
}
