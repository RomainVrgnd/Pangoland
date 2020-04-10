import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  food: string;
  age: number;
  famille: string;
  race: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email?: string;
  password?: string;
  name?: string;
  food?: string;
  age?: number;
  famille?: string;
  race?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUri: string = 'http://localhost:4200/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: string;
  private name: string;
  private email: string;
  private age: number;
  private famille: string;
  private race: string;
  private food: string;
  private userFriends: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  private request(
    method: "post" | "get" | "put",
    type: string,
    user?: TokenPayload,
    log?: boolean,

  ): Observable<any> {
    let base$;

    if (method === "post" && log === true) {
      base$ = this.http.post(`/api/${type}`, user);
    }
    else if (method === "post") {
      base$ = this.http.post(`/api/${type}`, user, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }
    else if (method === "put") {
      base$ = this.http.put(`/api/${type}`, user, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    else {
      base$ = this.http.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  public saveUserFamille(data): void {
    localStorage.setItem("famille", data.famille);
  }

  public saveUserRace(data): void {
    localStorage.setItem("race", data.race);
  }

  public saveUserName(data): void {
    localStorage.setItem("name", data.name);
  }

  public saveUserEmail(data): void {
    localStorage.setItem("email", data.email);
  }

  public saveUserFood(data): void {
    localStorage.setItem("food", data.food);
  }

  public saveUserAge(data): void {
    localStorage.setItem("age", data.age);
  }

  public saveMyFriends(data):void {
    localStorage.setItem('myFriends', JSON.stringify(data));
  }

  public saveUserInfos(data): void {
    this.saveUserAge(data);
    this.saveUserName(data);
    this.saveUserEmail(data);
    this.saveUserFamille(data);
    this.saveUserFood(data);
    this.saveUserRace(data);
  }
  public getUserFriends(): any[] {
    this.userFriends = JSON.parse(localStorage.getItem("myFriends"));
    console.log("GETTER : ", this.userFriends);
    return this.userFriends;
  }
  public getUserFamille(): string {
    this.famille = localStorage.getItem("famille");
    return this.famille;
  }
  public getUserRace(): string {
    this.race = localStorage.getItem("race");
    return this.race;
  }
  public getUserFood(): string {
    this.food = localStorage.getItem("food");
    return this.food;
  }
  public getUserAge(): number {
    this.age = parseInt(localStorage.getItem("age"));
    return this.age;
  }
  public getUserEmail(): string {
    this.email = localStorage.getItem("email");
    return this.email;
  }
  public getUserName(): string {
    this.name = localStorage.getItem("name");
    return this.name;
  }

  public clearMyFriends(): void{
    localStorage.removeItem('myFriends');
  }

  public register(user: TokenPayload): Observable<any> {
    let log = true;
    return this.request("post", "register", user, log);
  }

  public login(user: TokenPayload): Observable<any> {
    let log = true;
    return this.request("post", "login", user, log);
  }

  public profile(): Observable<any> {
    let log = false;
    return this.request("get", "profile");
  }

  public editProfile(user: TokenPayload): Observable<any> {
    let log = false;
    return this.request("post", "editProfile", user, log);
  }

  public getFriends(): Observable<any> {
    return this.request("get", "getFriends");
  }
  public searchFriends(): Observable<any> {
    return this.request("get", "searchFriends");
  }
  public myFriends(): Observable<any> {
    return this.request("get", "myFriends");
  }

  public addFriend(friendName): Observable<any> {
    return this.request("post", `getFriends/${friendName}`);
  }

  public deleteFriend(friendName): Observable<any> {
    return this.request("post", `myFriends/${friendName}`);
  }

  public registerAndAdd(user): Observable<any> {
    return this.request("post", "registerAndAdd",user);
  }
}