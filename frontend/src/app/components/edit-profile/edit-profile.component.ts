import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload, UserDetails } from "../../service/authentification.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent {
  details: UserDetails;
  credentials: TokenPayload = {
    email: "",
    name: "",
    famille: "",
    race: "",
    food:"",
    age: 0,
  };

  constructor(private auth: AuthenticationService, private router: Router) {}
ngOnInit(){
console.log("After", this.details);
this.credentials.email=this.auth.getUserEmail();
this.credentials.age=this.auth.getUserAge();
this.credentials.name=this.auth.getUserName();
this.credentials.famille=this.auth.getUserFamille();
this.credentials.race=this.auth.getUserRace();
this.credentials.food=this.auth.getUserFood();

}
  editProfile() {
    this.auth.editProfile(this.credentials).subscribe(
      () => {
        console.log("CREDENTIALS : ",this.credentials);
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}
