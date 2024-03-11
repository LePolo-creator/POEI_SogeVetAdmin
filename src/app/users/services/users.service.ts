import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {Observable, Subject} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl="https://localhost:7265/api/users/";

  options = {
    headers : new HttpHeaders({"content-type":"application/json"})
  }
  private users : User[] = []
  usersUpdated = new Subject<User[]>

  constructor( private http : HttpClient) { }

  getUsers(){
    this.http.get<User[]>(this.baseUrl).subscribe(users =>{
      this.users = users;
      console.log(this.users)
      this.usersUpdated.next([...this.users])
    })
  }

  getLocalUserById(id : number)  {
   return this.users.find(u => u.id == id )
  }

  getUserById(id:number) : Observable<User> {
    return this.http.get<User>(this.baseUrl+id)
  }


  // on ne peut pas créer un admin via le addUser => pas de isAdmin car par défaut false.
  addUser(firstName: string, lastName: string, email: string, password: string, address: string){
    this.http.post<User>(
      this.baseUrl,
      JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password, address: address}),
      this.options
      ).subscribe(newUser => {
        this.users.push(newUser);
        this.usersUpdated.next([...this.users])
      })
  }



  deleteUser(id:number){
    this.http.delete(this.baseUrl+id).subscribe(() => {
      this.users = this.users.filter(u => u.id != id),
      this.usersUpdated.next([...this.users])
    }
    )
  }

  editUser(id: number,firstName: string, lastName: string, email: string, password: string, address: string ) {
    this.http.put<User>(
      this.baseUrl+id,
      JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password, address: address}),
      this.options
      ).subscribe(user => {
        this.users = this.users.map(u => u.id == user.id ? user : u)
      })
    }

    // OPTIONNEL : désactiver un user, changer API: rajout colonne isActive default true
    /*
    deactivateUser(id: number) {
      const userToDeactivate = this.getLocalUserById(id);
      userToDeactivate?.isActive = false
    }
  */

}
