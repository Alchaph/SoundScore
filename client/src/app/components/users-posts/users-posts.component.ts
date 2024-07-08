import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/PostService/post.service";
import {Post} from '../../models/Post';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

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
    TranslateModule
  ],
  templateUrl: './users-posts.component.html',
  styleUrl: './users-posts.component.scss'
})
export class UsersPostsComponent implements OnInit {
  protected posts: Post[] = [];
  protected userId: number = parseInt(this.route.snapshot.params['id']);
  protected localUserId: number = 0;

  constructor(protected postService: PostService, private jwtService: JwtServiceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter((post) => post.user.id === this.userId)
    });
    this.jwtService.getMe().subscribe((user: User) => {
      this.localUserId = user.id!;
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
    console.log(currentPath)
    sessionStorage.setItem('previousPath', currentPath)
    this.router.navigate(['/home/post/', postId])
  }
}
