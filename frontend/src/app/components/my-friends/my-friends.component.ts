import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../service/authentification.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {

  Friends: any = [];
  myFriends: any = [];

  constructor(private auth: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.auth.myFriends().subscribe(
      data => {
        this.auth.saveMyFriends(data);
        this.Friends = this.auth.getUserFriends();
       // this.Friends = data;
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFriend(e) {
    this.auth.deleteFriend(e.target.id).subscribe(
      () => {
        alert("Vous venez de supprimer un ami !");

        this.Friends = this.auth.getUserFriends();

        location.reload();
      },
      err => {
        console.error(err);
      }
    );
  }
}