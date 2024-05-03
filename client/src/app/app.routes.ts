import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {HeadNavBarComponent} from "./components/head-nav-bar/head-nav-bar.component";
import {LoginComponent} from "./components/login/login.component";
import {AddPostComponent} from "./components/add-post/add-post.component";
import {LeaderBoardComponent} from "./components/leader-board/leader-board.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsersPostsComponent} from "./components/users-posts/users-posts.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/home', component: HomeComponent },
  { path: 'login/home/addPost', component: AddPostComponent },
  { path: 'login/home/leaderBoard', component: LeaderBoardComponent },
  { path: 'login/home/settings', component: SettingsComponent },
  { path: 'login/home/usersPosts', component: UsersPostsComponent },
  { path: 'login/home/usersPosts/editPost', component: EditPostComponent },
];
