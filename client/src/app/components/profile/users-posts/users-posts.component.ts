import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/PostService/post.service";
import {Post} from '../../../models/Post';
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JwtService} from "../../../services/JwtService/jwt.service";
import {User} from "../../../models/User";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";
import {UserInformationService} from "../../../services/UserInformationService/user-information.service";
import {UserFollowerService} from "../../../services/UserFollowerService/user-follower.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    RouterLink,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardTitle,
    TranslateModule,
    AsyncPipe
  ],
  templateUrl: './users-posts.component.html',
  styleUrl: './users-posts.component.scss'
})
export class UsersPostsComponent implements OnInit {
  posts: Post[] = [];
  protected userId: number = Number(this.route.snapshot.paramMap.get('id'));
  localUserId: number = 0;
  user: User = {} as User;
  postUser: User = {} as User;

  followed = false

  constructor(protected postService: PostService, private jwtService: JwtService, private router: Router, private route: ActivatedRoute, private userInformationService: UserInformationService, private userFollowService: UserFollowerService) {
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      if (posts) {
        this.posts = posts.filter((post) => post.user.id === this.userId)
      }
    });
    this.jwtService.getMe().subscribe((user: User) => {
      if (user && user.id) {
        this.localUserId = user.id;
        this.user = user;
        this.jwtService.getUserById(this.userId).subscribe((user: User) => {
          if (user.followers !== null) {
            for (let i = 0; i < user.followers.length; i++) {
              if (user.followers[i].id === this.user.id) {
                this.followed = true;
              }
            }
          }
          this.postUser = user
        })
      }
    });
  }

  deletePost(post: Post) {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.posts = this.posts.filter((p) => p.id !== post.id);
      });
    }
  }

  navigateToPost(postId: number | undefined) {
    const currentPath = this.router.url

    sessionStorage.setItem('previousPath', currentPath)
    this.router.navigate(['/home/post/', postId])
  }

  toggleFollow(user: User, shouldFollow: boolean) {
    const followAction = shouldFollow
      ? this.userFollowService.followUser(user)
      : this.userFollowService.unfollowUser(user);

    followAction.subscribe(() => {
      this.updateFollowers();
      this.followed = shouldFollow;
    });
  }


  updateFollowers() {
    this.jwtService.getUserById(this.userId).subscribe((user: User) => {
      this.postUser = user
    });
  }
}
