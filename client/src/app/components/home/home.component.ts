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
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSelect} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {HomeMobileComponent} from "./home-mobile/home-mobile.component";
import {HomeService} from "../../services/HomeService/home.service";
import {Observable} from "rxjs";
import {Post} from "../../models/Post";
import {PostService} from "../../services/PostService/post.service";
import {User} from "../../models/User";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";

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
    HomeMobileComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  protected isMobile: boolean = false;
  protected readonly window: Window = window;
  protected selectedFilters?: 'genre' | 'song' | 'artist';
  protected likeProcessing: boolean = false;
  protected activeUser: User = {} as User

  constructor(protected jwtService: JwtServiceService, protected homeService: HomeService, private breakpointObserver: BreakpointObserver, protected postService: PostService) {

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
    this.jwtService.getMe().subscribe(data => {
      this.activeUser = data
      this.homeService.loadPosts();
    })
  }

  postLiked(post: Post): boolean {
    return post.likes.some(dislike => dislike.user.id === this.activeUser.id);
  }

  postDisliked(post: Post): boolean {
    return post.dislikes.some(dislike => dislike.user.id === this.activeUser.id);
  }

  likePost(post: Post): void {
    this.likeProcessing = true;
    this.postDisliked(post) ? this.dislike(post).subscribe((data) => {
      this.handleLikeDislikeResponse(data, false, post)
      this.like(post).subscribe(data => this.handleLikeDislikeResponse(data, true, post))
    }) : this.like(post).subscribe(data => this.handleLikeDislikeResponse(data, true, post));
  }

  handleLikeDislikeResponse(data: boolean, likeOrDislike: boolean, post: Post): void {
    if (data) {
      likeOrDislike ? post.likes.push({
        post: post,
        user: this.activeUser,
        isLike: true
      }) : post.dislikes.push({
        post: post,
        user: this.activeUser,
        isLike: false
      });
    } else {
      likeOrDislike ? post.likes = post.likes.filter(data => data.user.id !== this.activeUser.id) : post.dislikes = post.dislikes.filter(data => data.user.id !== this.activeUser.id);
    }
    this.likeProcessing = false;
  }

  like(post: Post): Observable<boolean> {
    return this.postService.likeOrDislikePost(post, true);
  }

  dislikePost(post: Post): void {
    this.likeProcessing = true;
    this.postLiked(post) ? this.like(post).subscribe((data) => {
      this.handleLikeDislikeResponse(data, true, post)
      this.dislike(post).subscribe(data => this.handleLikeDislikeResponse(data, false, post))
    }) : this.dislike(post).subscribe(data => this.handleLikeDislikeResponse(data, false, post));
  }

  dislike(post: Post): Observable<boolean> {
    return this.postService.likeOrDislikePost(post, false);
  }

  selected(selected: string) {
    this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    event.stopPropagation();
    window.open(link, '_blank');
  }
}
