import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/PostService/post.service";
import { Post } from '../../models/Post';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    RouterLink
  ],
  templateUrl: './users-posts.component.html',
  styleUrl: './users-posts.component.scss'
})
export class UsersPostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

}
