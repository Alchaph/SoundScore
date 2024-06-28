import {Component, OnInit} from "@angular/core";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatLine, MatOption} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {FormsModule} from "@angular/forms";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  MatNestedTreeNode,
  MatTree,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodeOutlet,
  MatTreeNodeToggle
} from "@angular/material/tree";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Post} from "../../models/Post";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {Song} from "../../models/Song";
import {PostService} from "../../services/PostService/post.service";
import {LeaderBoardService} from "../../services/LeaderBoardService/leader-board.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSelect} from "@angular/material/select";

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatButtonToggle,
    MatIcon,
    RouterLink,
    MatFabButton,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardAvatar,
    MatCardHeader,
    MatCardImage,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatDivider,
    MatLine,
    MatList,
    MatListItem,
    MatTab,
    MatTabGroup,
    NgStyle,
    NgClass,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatChipListbox,
    MatChipOption,
    FormsModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatCardFooter,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatTreeNodeDef,
    MatTreeNode,
    MatTree,
    MatProgressBar,
    MatNestedTreeNode,
    MatIconButton,
    MatTreeNodeToggle,
    MatTreeNodeOutlet,
    MatSelect,
    MatOption
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  posts: Post[] = [];
  genres: Genre[] = [];
  artists: Artist[] = [];
  songs: Song[] = [];

  topSongs: Song[] = [];
  topGenres: Genre[] = [];
  topArtists: Artist[] = [];
  isMobile: boolean = false;

  selectedFilters?: 'genre' | 'song' | 'artist';

  constructor(private breakpointObserver: BreakpointObserver, private postService: PostService, private leaderBoardService: LeaderBoardService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
    this.leaderBoardService.getLeaderBoardByGenre().subscribe((data: Genre[]) => {
      this.topGenres = data;
    });
    this.leaderBoardService.getLeaderBoardByArtist().subscribe((data: Artist[]) => {
      this.topArtists = data;
    });
    this.leaderBoardService.getLeaderBoardBySong().subscribe((data: Song[]) => {
      this.topSongs = data;
    });

  }

  selected(selected: string) {
    this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
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




  // isButtonDisabled = false;
  // visiblePosts: Post[] = []; // First = Left, Last = Right
  // invisiblePosts: Post[] = [];
  //
  // onTabChange(event: MatTabChangeEvent) {
  //   const tab = event.tab.textLabel;
  //   switch (tab) {
  //     case 'Artist':
  //       this.init("artist")
  //       break;
  //     case 'Genre':
  //       this.init("genre")
  //       break;
  //     case 'Song':
  //       this.init("song")
  //       break;
  //
  //   }
  // }
  //
  // disableButton() {
  //   this.isButtonDisabled = true;
  //   setTimeout(() => {
  //     this.isButtonDisabled = false;
  //   }, 600);
  // }
  //
  // init(id: string) {
  //   let counter = 0;
  //   this.invisiblePosts = [];
  //   this.visiblePosts = [];
  //   this.postService.getPosts().subscribe((data: Post[]) => {
  //     for (let i = 0; i < data.length; i++) {
  //       switch (id) {
  //         case "artist":
  //           if (data[i].artist) {
  //             if (counter < 5) {
  //               this.visiblePosts.push(data[i]);
  //               counter++;
  //             } else {
  //               this.invisiblePosts.push(data[i]);
  //             }
  //           }
  //           break;
  //         case "genre":
  //           if (data[i].genre) {
  //             if (counter < 5) {
  //               this.visiblePosts.push(data[i]);
  //               counter++;
  //             } else {
  //               this.invisiblePosts.push(data[i]);
  //             }
  //           }
  //           break;
  //         case "song":
  //           if (data[i].song) {
  //             if (counter < 5) {
  //               this.visiblePosts.push(data[i]);
  //               counter++;
  //             } else {
  //               this.invisiblePosts.push(data[i]);
  //             }
  //           }
  //           break;
  //       }
  //     }
  //   });
  // }
  //
  // ngOnInit(): void {
  //   this.init("artist");
  // }
  //
  // leftSlide() {
  //   this.disableButton();
  //   const post = this.invisiblePosts[0];
  //   const postsContainer = document.querySelector('.posts-container') as HTMLElement;
  //   console.log(postsContainer)
  //   if (postsContainer) {
  //     postsContainer.classList.add('slide');
  //     postsContainer.style.transform = 'translateX(+320px)';
  //     setTimeout(() => {
  //       postsContainer.classList.remove('slide');
  //       this.invisiblePosts.shift();
  //       this.visiblePosts.unshift(post);
  //       const postOut = this.visiblePosts.pop();
  //       if (postOut) {
  //         this.invisiblePosts.push(postOut);
  //       }
  //       postsContainer.style.transform = 'translateX(0)';
  //     }, 600);
  //   }
  // }
  //
  // rightSlide() {
  //   this.disableButton();
  //   const post = this.invisiblePosts[this.invisiblePosts.length - 1];
  //   const postsContainer = document.querySelector('.posts-container') as HTMLElement;
  //   if (postsContainer) {
  //     postsContainer.classList.add('slide');
  //     postsContainer.style.transform = 'translateX(-320px)';
  //     setTimeout(() => {
  //       postsContainer.classList.remove('slide');
  //       this.invisiblePosts.pop();
  //       this.visiblePosts.push(post);
  //       const postOut = this.visiblePosts.shift();
  //       if (postOut) {
  //         this.invisiblePosts.unshift(postOut);
  //       }
  //       postsContainer.style.transform = 'translateX(0)';
  //     }, 600);
  //   }
  // }
  protected readonly window = window;
}
