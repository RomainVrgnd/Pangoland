import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../service/authentification.service";
import { isNullOrUndefined } from 'util';

@Component({
  templateUrl: "./get-friends.component.html",
  styleUrls: ["./get-friends.component.css"]
})
export class GetFriendsComponent implements OnInit {
  Friends: any[] = [];
  userFriends: any[] = [];
  username: string;
  myName: string;


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.myFriends().subscribe(
      req => {
        this.auth.saveMyFriends(req);
        // this.Friends = data;
      },
      err => {
        console.error(err);
      }
    );

    this.auth.getFriends().subscribe(
      (data: any[]) => {
        //console.log("DATA :", data, data.length);
        this.username = this.auth.getUserName();
        this.userFriends = this.auth.getUserFriends();
        this.myName = this.auth.getUserName();
        //console.log("THERE", this.userFriends, this.userFriends.length);
        //console.log("USERS :", this.Friends);

        for (let i = 0; i < data.length; i++) {
          //console.log("FOR 1");
          if (data[i].name !== this.myName) {
            if (!isNullOrUndefined(this.userFriends.length) && this.userFriends.length > 0) {
              //console.log("IF 1");
              for (let j = 0; j < this.userFriends.length; j++) {
                //console.log("FOR 2");
                //console.log(data[i].name, this.userFriends[j].followed, this.myName);
                if (data[i].name === this.userFriends[j].followed) {
                  break;
                }
                if ((j+1)===this.userFriends.length) {
                  //console.log("push 1");
                  this.Friends.push(data[i]);
                }
              }
            }
            else {
              //console.log("push 2");
              this.Friends.push(data[i]);

            }
          }
        }
        //console.log('FINAL', this.Friends);
        //console.log(this.Friends.length);
      },
      err => {
        console.error(err);
      }
    );
  }
  addFriend(e) {
    this.auth.addFriend(e.target.id).subscribe(
      () => {
        alert("Félicitations, vous avez un nouvel ami !");
        /*
        for(let i=0; i < this.Friends.length; i++){
          this.Friends.pop();
        }*/
        location.reload();
      },
      err => {
        console.error(err);
      }
    );
  }

}
