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
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.get<Category[]>(this.baseUrl, options).subscribe(
      categories => {
        this.categories = categories;
        // console.log(this.categories);
        this.categoriesUpdated.next([...this.categories]);
      }
    )
  }

  getCategoryById(id : number) : Observable<Category>{
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    return this.http.get<Category>(this.baseUrl+id, options);
  }

  getLocalCategoryById(id: number) {
    return this.categories.find(c => c.id == id);
  }

  addCategory(name: string){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.post<Category>(this.baseUrl, JSON.stringify({
      Name: name
    }), options).subscribe(category => {
      this.categories.push(category)
      this.categoriesUpdated.next([...this.categories])
    })
  }


  deleteCategory(id: number) { 
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.delete(this.baseUrl+id, options).subscribe( () => this.getCategories())
  }


  editCategory(id: number, name: string){
    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json",
        "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
        }
      )
    }
    this.http.put<Category>(this.baseUrl+id, JSON.stringify({
      Id : id,
      Name: name
    }), options).subscribe(category => {
      this.categories = this.categories.map(c => c.id === category.id ? category : c)
    })
  }
}
