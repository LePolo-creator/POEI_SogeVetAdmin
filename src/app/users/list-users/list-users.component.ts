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
  users : User[] = []
  userSubscription? : Subscription;
  usersToDisplay : User[] = []
  usersUpdated : User[] = []
  filteredUsers : User[] = []
  
  constructor(private usersService : UsersService){}

  filterUser(keyword: string){
    this.filteredUsers = this.usersToDisplay.filter(u => 
      u.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
      u.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
      u.email.toLowerCase().includes(keyword.toLowerCase())
      )

  }

  ngOnInit(): void {
    this.usersService.getUsers();
    this.userSubscription  = this.usersService.usersUpdated.subscribe( users =>  {
        this.users = users;
        this.usersToDisplay = this.users;
      })
  }
}
