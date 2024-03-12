import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "https://localhost:7265/api/login";
  options = {
    headers : new HttpHeaders(
      {
      "content-type":"application/json",
      "authorization" : "Bearer" + localStorage.getItem("token") || ""
      }
    )
  }

  constructor(private http : HttpClient, private router : Router
    ) { }

  login(username : string, password : string){
    const body = JSON.stringify({
      UserName : username,
      Password : password
    })
    
    console.log(body);
    this.http.post(this.baseUrl, body, this.options).subscribe(
      {
        next : (response : any) => {
          //console.log(response);
          //Récupérer le token renvoyé par l'API serveur
          const authToken = (<any>response).token;

          //Enregistrer le token dans localstorage
          localStorage.setItem("token", authToken);

          //une fois que l'utilisateur est connecté, je le redirige vers la liste des produits
          this.router.navigate(["/products"]);
        },
        error : error => console.log(error),
        complete : ()=> console.log("Complete")
      }
    )
  }


  isAuthenticated() : boolean{
    var token = localStorage.getItem("token")
    if( token == undefined 
    )
      return false;
    //Il recommandé d'ajouter une requête vers le serveur afin de vérifier la validité du token
    return true;
  }
}