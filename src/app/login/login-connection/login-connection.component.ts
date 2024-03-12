import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-connection',
  templateUrl: './login-connection.component.html',
  styleUrls: ['./login-connection.component.css']
})
export class LoginConnectionComponent {


  constructor(private loginService : LoginService){}

  login(username : string, password : string){
    this.loginService.login(username, password);
  }

}
