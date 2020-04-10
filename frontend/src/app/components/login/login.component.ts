import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../../service/authentification.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({

  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  credentials: TokenPayload = {
    email: "",
    password: ""
  };


  constructor(private auth: AuthenticationService, private router: Router) {}

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
      }

    this.credentials.email=this.loginForm.get("email").value;
    this.credentials.password=this.loginForm.get("password").value;
    this.login();
  }

  getEmailErrorMessage() {
    return this.loginForm.controls['email'].hasError('required') ? 'Ce champ est obligatoire' :
        this.loginForm.controls['email'].hasError('email') ? "Le format de l'adresse n'est pas valide" :
            '';
  }
  getPasswordErrorMessage() {
    return this.loginForm.controls['password'].hasError('required') ? 'Ce champ est obligatoire' :
        this.loginForm.controls['password'].hasError('minlength') ? "6 caractères minimum" :
            '';
  }

  login() {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
        alert("Adresse mail ou mot de passe erroné");
      }
    );
  }
}
