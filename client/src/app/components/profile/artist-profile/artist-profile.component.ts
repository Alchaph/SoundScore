import {Component, OnDestroy} from '@angular/core';
import {JwtService} from "../../../services/JwtService/jwt.service";
import {User} from "../../../models/User";
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Song} from '../../../models/Song';
import {SongService} from "../../../services/SongService/song.service";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {ArtistService} from "../../../services/ArtistService/artist.service";
import {Artist} from "../../../models/Artist";
import {Location} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {MatBadge} from "@angular/material/badge";
import {BehaviorSubject, takeUntil} from "rxjs";


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
    MatBadge,
  ],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent implements OnDestroy{
  protected user: User | undefined;
  artist: Artist | undefined;
  artistSongs: Song[] = [];
  protected artistId: number | undefined;

  constructor(
    private jwtService: JwtService,
    private songService: SongService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    protected router: Router,
  ) {
    this.init()
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  openLink(link: string | undefined) {
    if (link) {
      window.open(link, '_blank');
    }
  }


  deleteSong(id: number) {
    this.songService.deleteSong(id).pipe(takeUntil(this.$destroy)).subscribe((data) => {
      this.artistSongs = [];
      this.init();
    })
  }

  init() {
    this.jwtService.getUserById(Number(this.route.snapshot.paramMap.get('id'))).pipe(takeUntil(this.$destroy)).subscribe((u: User) => {
      if (u && u.id) {
        this.artistId = u.artist?.id;
        this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe((u: User) => {
          this.user = u;
          this.songService.getSongs().pipe(takeUntil(this.$destroy)).subscribe((songs: Song[]) => {
            if (this.user) {
              if (this.artistId && this.artistId !== 0) {
                this.artistService.getArtist(this.artistId).pipe(takeUntil(this.$destroy)).subscribe((a: Artist) => {
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
      }
    });
  }
}
