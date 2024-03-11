import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  users : User[] = []                  // users
  userSubscription? : Subscription;
  usersToDisplay : User[] = []
  usersUpdated : User[] = []
  filteredUsers? : User[];

  constructor(private usersService : UsersService){}

  filterUser(keyword: string){
    this.filteredUsers = this.usersToDisplay.filter(u =>
      u.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
      u.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
      u.email.toLowerCase().includes(keyword.toLowerCase())
      )
  }

  deleteUser(id : number){
    if (confirm("Etes-vous sûrs de vouloir supprimer cet utilisateur ?"))
    {
      this.usersService.deleteUser(id);
    }
  }

  // deactivateUser(id: number){
  //   this.usersService.deactivateUser(id);
  // }

  ngOnInit(): void {
    this.usersService.getUsers();
    this.userSubscription  = this.usersService.usersUpdated.subscribe( users =>  {
        // only non admin users (clients)
        this.users = users.filter(u => !u.isAdmin);
        this.usersToDisplay = this.users;
      })
      console.log(this.usersToDisplay)
      console.log(this.users)
  }
}
