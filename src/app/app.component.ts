import { Component } from '@angular/core';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POEI_SogeVet_Admin';

  constructor(private loginService: LoginService){}

  logout(){
    if (confirm("Etes-vous sûrs de vouloir vous deconnecter?")) {
      this.loginService.logout();
    }
  }
}
