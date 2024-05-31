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

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'home/post/:postId', component: PostComponent},
  { path: 'home/addPost/:postType', component: AddEditPostComponent },
  { path: 'home/editPost/:postId', component: AddEditPostComponent },
  {path: 'home/post/:postId', component: PostComponent},
  {path: 'home/leaderBoard', component: LeaderBoardComponent},
  {path: 'home/settings', component: SettingsComponent},
  {path: 'home/usersPosts', component: UsersPostsComponent},
  {path: 'home/artistProfile/:artistId', component: ArtistProfileComponent},
  {path: 'home/artistProfile', component: ArtistProfileComponent},

  {path: 'home/addArtist', component: ArtistRegisterEditComponent},
  {path: 'home/editArtist/:artistId', component: ArtistRegisterEditComponent},
  {path: 'home/addSong', component: AddEditSongComponent},
  {path: 'home/editSong/:songId', component: AddEditSongComponent}
];
