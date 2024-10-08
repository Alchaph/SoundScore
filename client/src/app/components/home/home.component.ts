import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
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
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSelect} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {HomeMobileComponent} from "./home-mobile/home-mobile.component";
import {HomeService} from "../../services/HomeService/home.service";
import {BehaviorSubject, Observable, takeUntil} from "rxjs";
import {Post} from "../../models/Post";
import {PostService} from "../../services/PostService/post.service";
import {User} from "../../models/User";
import {JwtService} from "../../services/JwtService/jwt.service";
import {LikeOrDislikeComponent} from "../like-or-dislike/like-or-dislike.component";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {Artist} from "../../models/Artist";
import {CommentComponent} from "../comment/comment.component";

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
    TranslateModule,
    HomeMobileComponent,
    LikeOrDislikeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit, OnDestroy {

  isMobile: boolean = false;
  protected readonly window: Window = window;
  protected selectedFilters?: 'genre' | 'song' | 'artist';
  protected likeProcessing: boolean = false;
  activeUser: User = {} as User


  constructor(protected jwtService: JwtService, protected homeService: HomeService, private breakpointObserver: BreakpointObserver, protected postService: PostService) {

  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit() {
    this.breakpointObserver.observe(
      [
        Breakpoints.XSmall,
        Breakpoints.Small]
    ).subscribe(result => {
      if (window.innerHeight > 700) {
        this.isMobile = result.matches;
      }
    });
    this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe(data => {
      this.activeUser = data
      this.homeService.loadPosts();
    })
  }

  gotoArtist(id:number | undefined) {
    this.homeService.gotoArtist(id);
  }
}
