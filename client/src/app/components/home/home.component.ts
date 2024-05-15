import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton, MatFabButton} from "@angular/material/button";
import {PostService} from "../../services/PostService/post.service";
import {Post} from "../../models/Post";
import {
  MatCard, MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";


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
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  posts: Post[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      // console.log(data)
      this.posts = data;
    });
  }


}
