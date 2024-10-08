import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AddEditPostComponent} from "./components/add-edit-post/add-edit-post-component";
import {LeaderBoardComponent} from "./components/leader-board/leader-board.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {PostComponent} from "./components/post/post.component";
import {ArtistRegisterEditComponent} from "./components/artist-register-edit/artist-register-edit.component";
import {AddEditSongComponent} from "./components/add-edit-song/add-edit-song.component";
import {loginGuard} from "./guards/login.guard";
import {SearchComponent} from "./components/search/search.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {PremiumComponent} from "./components/premium/premium.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', canActivate: [loginGuard], component: HomeComponent},
  {path: 'home/post/:postId', canActivate: [loginGuard], component: PostComponent},
  {path: 'home/post/:postId/comment/:commentId', canActivate: [loginGuard], component: PostComponent},
  {path: 'home/addPost/:postType', canActivate: [loginGuard], component: AddEditPostComponent},
  {path: 'home/editPost/:postId', canActivate: [loginGuard], component: AddEditPostComponent},
  {path: 'home/leaderBoard', canActivate: [loginGuard], component: LeaderBoardComponent},
  {path: 'home/settings', canActivate: [loginGuard], component: SettingsComponent},
  {path: 'home/premium', canActivate: [loginGuard], component: PremiumComponent},
  {path: 'home/userProfile/:id/:tab', canActivate: [loginGuard], component: ProfileComponent},
  {path: 'home/addArtist', canActivate: [loginGuard], component: ArtistRegisterEditComponent},
  {path: 'home/editArtist/:artistId', canActivate: [loginGuard], component: ArtistRegisterEditComponent},
  {path: 'home/addSong', canActivate: [loginGuard], component: AddEditSongComponent},
  {path: 'home/editSong/:songId', canActivate: [loginGuard], component: AddEditSongComponent},
  {path: 'home/search/:searchTerm', canActivate: [loginGuard], component: SearchComponent}
];
