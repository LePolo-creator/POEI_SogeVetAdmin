import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "https://localhost:7265/api/login";
  

  constructor(private http : HttpClient, private router : Router
    ) { }

  login(username : string, password : string){
    const body = JSON.stringify({
      UserName : username,
      Password : password
    })


    const options = {
      headers : new HttpHeaders(
        {
        "content-type":"application/json"
        }
      )
    }
    
    console.log(body);
    this.http.post<any>(this.baseUrl, body, options).subscribe(
      {
        next : (response : any) => {
          // console.log(response);
          //Récupérer le token renvoyé par l'API serveur
          const authToken = (<any>response);

          //Enregistrer le token dans localstorage
          localStorage.setItem("authSogevet", JSON.stringify(authToken));

          //une fois que l'utilisateur est connecté, je le redirige vers la liste des produits
          this.router.navigate(["/products"]);
        },
        error : error => console.log(error),
        complete : ()=> console.log("Complete")
      }
    )
  }


  isAuthenticated() : boolean{
    if (localStorage.getItem("authSogevet")==undefined) {
      return false;
    }
    var tokenAuth = JSON.parse(localStorage.getItem("authSogevet")!).token
    if( tokenAuth == undefined 
    )
      return false;
    //Il recommandé d'ajouter une requête vers le serveur afin de vérifier la validité du token
    return true;
  }
}