import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Category } from '../model/category';
import { ICategoryToDisplay } from '../model/i-category-to-display';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories : Category[] = [];
  categoriesUpdated = new Subject<Category[]>()     // Canal pour récupérer les modifications

  baseUrl="https://localhost:7265/api/categories/";

  constructor( private http: HttpClient) { }


  transformCategories( categories : Category[]) : ICategoryToDisplay[] {
    return categories.map( c => {
      return {
        id : c.id,
        name : c.name,
        nbOfProduct : c.products.length
      } as ICategoryToDisplay;
    })
  }

  getCategories(){
    this.http.get<Category[]>(this.baseUrl).subscribe(
      categories => {
        this.categories = categories;
        // console.log(this.categories);
        this.categoriesUpdated.next([...this.categories]);
      }
    )
  }

  getCategoryById(id : number) : Observable<Category>{
    return this.http.get<Category>(this.baseUrl+id);
  }

  getLocalCategoryById(id: number) {
    return this.categories.find(c => c.id == id);
  }

  addCategory(name: string){
    const options = {
      headers : new HttpHeaders({"content-type":"application/json"})
    }
    this.http.post<Category>(this.baseUrl, JSON.stringify({
      Name: name
    }), options).subscribe(category => {
      this.categories.push(category)
      this.categoriesUpdated.next([...this.categories])
    })
  }


  deleteCategory(id: number) { 
    this.http.delete(this.baseUrl+id).subscribe( () => this.getCategories())
  }


  editCategory(id: number, name: string){
    const options = {
      headers : new HttpHeaders({"content-type":"application/json"})
    }
    this.http.put<Category>(this.baseUrl+id, JSON.stringify({
      Id : id,
      Name: name
    }), options).subscribe(category => {
      this.categories = this.categories.map(c => c.id === category.id ? category : c)
    })
  }
}
