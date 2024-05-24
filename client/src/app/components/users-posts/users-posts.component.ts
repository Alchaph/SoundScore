import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/PostService/post.service";
import {Post} from '../../models/Post';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {RouterLink} from "@angular/router";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    RouterLink,
    MatIcon
  ],
  templateUrl: './users-posts.component.html',
  styleUrl: './users-posts.component.scss'
})
export class UsersPostsComponent implements OnInit {
  posts: Post[] = [];
  activeUser: User;

  constructor(protected postService: PostService, private jwtService: JwtServiceService) {
    this.activeUser = {} as User;
  }

  ngOnInit() {
    this.jwtService.getMe().subscribe((user) => {
      this.activeUser = user;
    });
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter((post) => post.user.id === this.activeUser.id)
    });
  }

  deletePost(post: Post) {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.posts = this.posts.filter((p) => p.id !== post.id);
      });
    }
  }

  protected readonly JSON = JSON;
}
