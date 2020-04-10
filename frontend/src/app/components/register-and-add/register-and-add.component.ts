import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../../service/authentification.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { FormBuilder }  from '@angular/forms';

import { equalValueValidator } from '../../equal-value-validator';

@Component({
  templateUrl: "./register-and-add.component.html",
  styleUrls: ["./register-and-add.component.css"]
})
export class RegisterAndAddComponent {
  credentials: TokenPayload = {
    email: "",
    name: "",
    password: "",
    famille: "",
    race: "",
    food: "",
    age: 0,
  };
/*
  registerForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword: new FormControl('',Validators.required),
    famille: new FormControl('',Validators.required),
    race: new FormControl('',Validators.required),
    age: new FormControl('',Validators.required),
    food: new FormControl('',Validators.required),
  });*/

  public registerForm: FormGroup;
  private submitError = false;
  private formErrors = {
    'password': '',
    'confirmPassword': '',
    'email': "",
    'name': "",
    'famille': "",
    'race': "",
    'food': "",
    'age': 0,

  };

  constructor( private auth: AuthenticationService, private router: Router, private fb : FormBuilder) { }
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      'name': ['', [
        Validators.required
        ]
      ],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
        ]
      ],
      'email': ['',[
        Validators.required,Validators.email]
      ],
      'famille': ['', [
        Validators.required
        ]
      ],
      'race': ['', [
        Validators.required
        ]
      ],
      'food': ['', [
        Validators.required
        ]
      ],
      'age': ['', [
        Validators.required
        ]
      ],
    },
    /*{validator: this.passwordMatchValidator }*/
    
    );
  }
  
/*
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('other').value
       ? null : { 'mismatch': true };
  }

  comparePasswords() {
    console.log("cmp");
    return 'Mots de passe différents';
  }
  getOtherErrorMessage() {
    console.log("getConfir");
    if(this.registerForm.controls['other'].hasError('required')){
      return "Ce champ est obligatoire";
    }
    else {
      console.log("ELSE");
      return "MDP";
    }
    
    if(this.registerForm.get('password').value !== this.registerForm.get('other').value){
      console.log("IF 1");
      return this.registerForm.errors.mismatch ? 'MDP' :
      '';
    }
    else{
    return this.registerForm.controls['other'].hasError('required') ? 'Ce champ est obligatoire' :
            '';
  }
}*/

  getEmailErrorMessage() {
    return this.registerForm.controls['email'].hasError('required') ? 'Ce champ est obligatoire' :
        this.registerForm.controls['email'].hasError('email') ? "Le format de l'adresse n'est pas valide" :
            '';
  }
  getPasswordErrorMessage() {
    return this.registerForm.controls['password'].hasError('required') ? 'Ce champ est obligatoire' :
        this.registerForm.controls['password'].hasError('minlength') ? "6 caractères minimum" :
        
            '';
  }
  getNameErrorMessage() {
    return this.registerForm.controls['name'].hasError('required') ? 'Ce champ est obligatoire' :
            '';
  }
  getFamilleErrorMessage() {
    return this.registerForm.controls['famille'].hasError('required') ? 'Ce champ est obligatoire' :
            '';
  }
  getRaceErrorMessage() {
    return this.registerForm.controls['race'].hasError('required') ? 'Ce champ est obligatoire' :
            '';
  }
  getFoodErrorMessage() {
    return this.registerForm.controls['food'].hasError('required') ? 'Ce champ est obligatoire' :
            '';
  }
  getAgeErrorMessage() {
    return this.registerForm.controls['age'].hasError('required') ? 'Un nombre est attendu' :
            '';
  }


  register() {
    console.log(this.credentials);
    this.auth.registerAndAdd(this.credentials).subscribe(
      () => {

        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
        return;
      }
    );
  }


  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.credentials.name = this.registerForm.get('name').value;
    this.credentials.email = this.registerForm.get('email').value;
    this.credentials.password = this.registerForm.get('password').value;
    this.credentials.age = this.registerForm.get('age').value;
    this.credentials.famille = this.registerForm.get('famille').value;
    this.credentials.race = this.registerForm.get('race').value;
    this.credentials.food = this.registerForm.get('food').value;

    console.log("OnSubmit : ", this.credentials);
    this.register();
  }
}