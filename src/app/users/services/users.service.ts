import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {Observable, Subject, lastValueFrom} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl="https://localhost:7265/api/users/";
  user? : User

  options = {
    headers : new HttpHeaders(
      {
      "content-type":"application/json",
      "authorization" : "Bearer " + JSON.parse(localStorage.getItem("authSogevet")!).token || ""
      }
    )
  }
  private users : User[] = []
  usersUpdated = new Subject<User[]>

  constructor( private http : HttpClient) { }

  getUsers(){
    console.log(this.options)
    this.http.get<User[]>(this.baseUrl, this.options).subscribe(users =>{
      this.users = users;
      console.log(this.users)
      this.usersUpdated.next([...this.users])
    })
  }

  getLocalUserById(id : number)  {
   return this.users.find(u => u.id == id )
  }

  getUserById(id:number) : Observable<User> {
    return this.http.get<User>(this.baseUrl+id, this.options)
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
    this.http.delete( this.baseUrl+id, this.options).subscribe(() => {
      this.users = this.users.filter(u => u.id != id),
      this.usersUpdated.next([...this.users])
    }
    )
  }

  getUserFullName(id : number){
    let fullName = "";
     this.getUserById(id).subscribe(user => {
       
       fullName= user.firstName
     } )
     return fullName
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

    deactivateUser(id: number) {
      const userToDeactivate = this.getLocalUserById(id);
      userToDeactivate!.isActive = false
    }
    reactivateUser(id: number) {
      const userToReactivate = this.getLocalUserById(id);
      userToReactivate!.isActive = true
    }
  

}
