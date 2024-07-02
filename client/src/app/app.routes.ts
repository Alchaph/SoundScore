import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AddEditPostComponent} from "./components/add-edit-post/add-edit-post-component";
import {LeaderBoardComponent} from "./components/leader-board/leader-board.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsersPostsComponent} from "./components/users-posts/users-posts.component";
import {PostComponent} from "./components/post/post.component";
import {ArtistProfileComponent} from "./components/artist-profile/artist-profile.component";
import {ArtistRegisterEditComponent} from "./components/artist-register-edit/artist-register-edit.component";
import {AddEditSongComponent} from "./components/add-edit-song/add-edit-song.component";
import {loginGuard} from "./guards/login.guard";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home',canActivate: [loginGuard], component: HomeComponent },
  {path: 'home/post/:postId',canActivate: [loginGuard], component: PostComponent},
  { path: 'home/addPost/:postType',canActivate: [loginGuard], component: AddEditPostComponent },
  { path: 'home/editPost/:postId',canActivate: [loginGuard], component: AddEditPostComponent },
  {path: 'home/leaderBoard',canActivate: [loginGuard], component: LeaderBoardComponent},
  {path: 'home/settings',canActivate: [loginGuard], component: SettingsComponent},
  {path: 'home/usersPosts/:id',canActivate: [loginGuard], component: UsersPostsComponent},
  {path: 'home/artistProfile/:artistId',canActivate: [loginGuard], component: ArtistProfileComponent},
  {path: 'home/artistProfile',canActivate: [loginGuard], component: ArtistProfileComponent},
  {path: 'home/addArtist',canActivate: [loginGuard], component: ArtistRegisterEditComponent},
  {path: 'home/editArtist/:artistId',canActivate: [loginGuard], component: ArtistRegisterEditComponent},
  {path: 'home/addSong',canActivate: [loginGuard], component: AddEditSongComponent},
  {path: 'home/editSong/:songId',canActivate: [loginGuard], component: AddEditSongComponent}
];
