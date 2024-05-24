import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {HeadNavBarComponent} from "./components/head-nav-bar/head-nav-bar.component";
import {LoginComponent} from "./components/login/login.component";
import {AddPostComponent} from "./components/add-post/add-post.component";
import {LeaderBoardComponent} from "./components/leader-board/leader-board.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsersPostsComponent} from "./components/users-posts/users-posts.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {PostComponent} from "./components/post/post.component";
import {AddArtistComponent} from "./components/add-artist/add-artist.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'home/post/:postId', component: PostComponent},
  { path: 'home/addPost', component: AddPostComponent },
  {path: 'home/post/:postId', component: PostComponent},
  { path: 'home/leaderBoard', component: LeaderBoardComponent },
  { path: 'home/settings', component: SettingsComponent },
  { path: 'home/usersPosts', component: UsersPostsComponent },
  { path: 'home/usersPosts/editPost', component: EditPostComponent },
  { path: 'home/addArtist', component: AddArtistComponent },
];
