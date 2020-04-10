import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { GetFriendsComponent } from "./components/get-friends/get-friends.component";
import { MyFriendsComponent } from "./components/my-friends/my-friends.component";
import { AuthGuard } from "./auth.guard";
import { AnonGuard } from "./anonymous.guard";

import { RegisterAndAddComponent } from './components/register-and-add/register-and-add.component';
const routes: Routes = [
  { path: "", component: HomeComponent , canActivate: [AnonGuard]},
  { path: "login", component: LoginComponent , canActivate: [AnonGuard]},
  { path: "register", component: RegisterComponent , canActivate: [AnonGuard]},
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "editProfile", component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: "getFriends", component: GetFriendsComponent, canActivate: [AuthGuard] },
  { path: "myFriends", component: MyFriendsComponent, canActivate: [AuthGuard] },
  { path: "registerAndAdd", component: RegisterAndAddComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}