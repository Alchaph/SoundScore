import {Component} from '@angular/core';
import {JwtServiceService} from "../../../services/JwtService/jwt-service.service";
import {User} from "../../../models/User";
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Song} from '../../../models/Song';
import {SongService} from "../../../services/SongService/song.service";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {ArtistService} from "../../../services/ArtistService/artist.service";
import {Artist} from "../../../models/Artist";
import {Location} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-artist-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatButton,
    RouterLink,
    MatIcon,
    MatLine,
    MatIconButton,
    HeadNavBarComponent,
    TranslateModule,
  ],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent {
  protected user: User | undefined;
  artist: Artist | undefined;
  artistSongs: Song[] = [];
  protected artistId: number | undefined;

  constructor(
    private jwtService: JwtServiceService,
    private songService: SongService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
  ) {
    this.init()
  }

  openLink(link: string | undefined) {
    if (link) {
      window.open(link, '_blank');
    }
  }


  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe((data) => {
      this.artistSongs = [];
      this.init();
    })
  }

  init() {
    this.jwtService.getUserById(Number(this.route.snapshot.paramMap.get('id'))).subscribe((u: User) => {
      this.artistId = u.artist?.id;
      // console.log(this.artistId)
      this.jwtService.getMe().subscribe((u: User) => {
        this.user = u;
        this.songService.getSongs().subscribe((songs: Song[]) => {
          if (this.user) {
            if (this.artistId && this.artistId !== 0) {
              this.artistService.getArtist(this.artistId).subscribe((a: Artist) => {
                this.artist = a;
                this.artistSongs = songs.filter(song => song.artist.id === a.id);
              });
            } else if (this.user.artist) {
              this.artist = this.user.artist;
              this.artistId = this.user.artist.id;
              this.artistSongs = songs.filter(song => song.artist.id === this.artistId);
            }
          }
        });
      });
    });
  }
}
