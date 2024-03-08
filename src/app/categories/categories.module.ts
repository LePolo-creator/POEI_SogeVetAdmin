import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';


@NgModule({
  declarations: [
    ListCategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule
  ]
})
export class CategoriesModule { }
