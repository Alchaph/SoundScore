import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {TranslateModule} from "@ngx-translate/core";
import {Post} from "../../models/Post";
import {Song} from "../../models/Song";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PostService} from "../../services/PostService/post.service";
import {LeaderBoardService} from "../../services/LeaderBoardService/leader-board.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {SongService} from "../../services/SongService/song.service";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {forkJoin} from "rxjs";

type CombinedType = Artist | Song | User | Post;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatChipListbox,
    MatChipOption,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFabButton,
    MatIcon,
    MatList,
    MatListItem,
    MatMenu,
    MatMenuItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    TranslateModule,
    RouterLink,
    FormsModule,
    MatMenuTrigger,
    MatFormField,
    MatInput,
    MatCheckbox
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  posts: Post[] = [];
  users: User[] = [];
  songs: Song[] = [];
  artists: Artist[] = [];
  selectedFilters: 'user' | 'post' | 'song' | 'artist' | 'all' = 'all';
  isMobile: boolean = false;
  combinedList: CombinedType[] = [];
  searchTerm: string = '';
  constructor(private jwtService: JwtServiceService, private songService: SongService, private artistService : ArtistService, private breakpointObserver: BreakpointObserver, private postService: PostService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    forkJoin({
      posts: this.postService.getPosts(),
      users: this.jwtService.getUsers(),
      songs: this.songService.getSongs(),
      artists: this.artistService.getArtists()
    }).subscribe({
      next: ({ posts, users, songs, artists }) => {
        this.posts = posts.reverse();
        this.users = users;
        this.songs = songs;
        this.artists = artists;

        this.combinedList = [...this.posts, ...this.users, ...this.songs, ...this.artists];
        console.log(this.combinedList);
      },
      error: error => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        console.log('All observables completed');
      }
    });
  }

  keepMenuOpen(event: MouseEvent) {
    event.stopPropagation();
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    event.stopPropagation();
    window.open(link, '_blank');
  }

  isPost(item: CombinedType): item is Post {
    return (item as Post).content !== undefined;
  }

  isUser(item: CombinedType): item is User {
    return (item as User).email !== undefined;
  }

  isArtist(item: CombinedType): item is Artist {
    return (item as Artist).description !== undefined;
  }

  isSong(item: CombinedType): item is Song {
    return (item as Song).link !== undefined;
  }


  search() {
    this.combinedList = [...this.posts, ...this.users, ...this.songs, ...this.artists];
    this.combinedList = this.combinedList.filter((item) => {
      if (this.isPost(item)) {
        return item.content.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      if (this.isUser(item)) {
        return item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      if (this.isArtist(item)) {
        return item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      if (this.isSong(item)) {
        return item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return false;
    });
  }
}
