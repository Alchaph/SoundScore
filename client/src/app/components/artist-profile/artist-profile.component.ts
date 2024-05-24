import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {User} from "../../models/User";
import {Artist} from "../../models/Artist";
import {Song} from "../../models/Song";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {SongService} from "../../services/SongService/song.service";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";


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
    MatIconButton,
    HeadNavBarComponent
  ],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.ts'
})
export class ArtistProfileComponent {
  user: User | undefined;
  artist: Artist | undefined;
  artistSongs: Song[] = [];
  artistId: number = Number(this.route.snapshot.paramMap.get('artistId'));


  constructor(private jwtService: JwtServiceService, private songService: SongService, private artistService: ArtistService, private route: ActivatedRoute) {
    jwtService.getMe().subscribe((user: User) => {
      this.user = user
      if (user.artist) {
        songService.getSongs().subscribe((songs: Song[]) => {
          if (this.artistId !== 0) {
            artistService.getArtist(this.artistId).subscribe((a: Artist) => {
              this.artist = a;
              this.artistSongs = songs.filter((song: Song) => song.artist.id === a.id);
            });
          } else {
            if (user.artist && user.artist.id) {
              this.artist = user.artist;
              this.artistId = user.artist.id;
              this.artistSongs = songs.filter((song: Song) => song.artist.id === this.artist?.id);
            }
          }
        });
      }
    });
  }

  openLink(link: string | undefined) {
    window.open(link, '_blank');
  }

  protected readonly JSON = JSON;
}
