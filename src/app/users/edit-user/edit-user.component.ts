import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user? : User

  constructor(
    private activatedRoute : ActivatedRoute,
    private usersService : UsersService,
    private router: Router
  ){}

  editUser(form : NgForm) {
    this.usersService.editUser(this.user!.id,
      form.value.firstName, form.value.lastName, form.value.email, form.value.password, form.value.address);
    this.router.navigate(['/users'])
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe( params => {
        const id = params["id"];
        this.usersService.getUserById(id).subscribe(u =>
          this.user = u)
      })
  }
}
