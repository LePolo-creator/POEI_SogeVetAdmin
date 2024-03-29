import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';
import { Subscription } from 'rxjs';
import { ICategoryToDisplay } from '../model/i-category-to-display';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categories : Category[] = [];
  categoriesToDisplay : ICategoryToDisplay[] = [];
  filteredCategories? : ICategoryToDisplay[];

  categorySubscription? : Subscription;
  

  constructor( private categoryService : CategoriesService ) {}

  filterCategory(keyword : string){
    // console.log(keyword);
    this.filteredCategories = this.categoriesToDisplay.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()))
  }

  deleteCategory(id : number){
    let category = this.categoryService.getLocalCategoryById(id);
    if (category!.products.length != 0) {
        alert(`Veuillez déplacer les ${category!.products.length} produits de la catégorie `)
    }  
    else if (confirm("Etes-vous sûrs de vouloir supprimer cette catégorie ?"))
    {
      this.categoryService.deleteCategory(id);
    }
  }


  
  ngOnInit(): void {
     this.categoryService.getCategories();

     this.categorySubscription = this.categoryService.categoriesUpdated.subscribe(
      c => { 
        this.categories = c,
        this.categoriesToDisplay = this.categoryService.transformCategories(c);
        }
     );
  }
}
