import {Component, OnInit, ViewEncapsulation} from "@angular/core";
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
import {TranslateModule} from "@ngx-translate/core";

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
    MatOption,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  posts: Post[] = [];

  topSongs: Song[] = [];
  topGenres: Genre[] = [];
  topArtists: Artist[] = [];
  isMobile: boolean = false;
  protected readonly window: Window = window;
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
      this.posts = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardByGenre().subscribe((data: Genre[]) => {
      this.topGenres = data.reverse();
      // console.log(this.topGenres)
    });
    this.leaderBoardService.getLeaderBoardByArtist().subscribe((data: Artist[]) => {
      this.topArtists = data.reverse();
      // console.log(this.topArtists)
    });
    this.leaderBoardService.getLeaderBoardBySong().subscribe((data: Song[]) => {
      this.topSongs = data.reverse();
      // console.log(this.topSongs)

    });
  }

  selected(selected: string) {
    console.log(selected.toLowerCase());
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
}
