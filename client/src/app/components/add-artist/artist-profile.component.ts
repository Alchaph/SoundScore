import {Component} from '@angular/core';
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {Song} from '../../models/Song';
import {SongService} from "../../services/SongService/song.service";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-add-artist',
  standalone: true,
    imports: [
        HeadNavBarComponent,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatButton,
        RouterLink,
        MatIcon,
        MatLine,
        MatIconButton
    ],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent {
  user: User | undefined;
  artistSongs: Song[] = [];

  constructor(private jwtService: JwtServiceService, private songService: SongService) {
    jwtService.getMe().subscribe((user: User) => {
      this.user = user
      if (user.artist) {
        songService.getSongs().subscribe((songs: Song[]) => {
          this.artistSongs = songs.filter((song: Song) => song.artist.id === user.artist?.id);
        });
      }
    });
  }

  openLink(link: string | undefined) {
    window.open(link, '_blank');
  }

  protected readonly JSON = JSON;
}
