import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatFabButton} from "@angular/material/button";
import {Post} from "../../models/Post";
import {PostOut} from "../../models/PostOut";
import {PostServiceService} from "../../services/PostService/post-service.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatButtonToggle,
    MatIcon,
    RouterLink,
    MatFabButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private postService: PostServiceService) { }

  posts: PostOut[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      console.log(data)
      this.posts = data;
    });
  }


}
