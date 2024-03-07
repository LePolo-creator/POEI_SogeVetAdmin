import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import { HttpClient} from '@angular/common/http'
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories : Category[] = [];
  categoriesUpdated = new Subject<Category[]>()

  baseUrl="https://localhost:7265/api/categories/";

  constructor( private http: HttpClient) { }

  getCategories(){
    this.http.get<Category[]>(this.baseUrl).subscribe(
      categories => {
        this.categories = categories;
        console.log(this.categories);
        this.categoriesUpdated.next([...this.categories]);
      }
    )
  }

  getCategoryById(id : number){
    return this.categories.find(c => c.id == id);
  }
}
