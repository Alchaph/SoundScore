import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton, MatFabButton} from "@angular/material/button";
import {PostService} from "../../services/PostService/post.service";
import {Post} from "../../models/Post";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";


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
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  visiblePosts: Post[] = []; // First = Left, Last = Right
  invisiblePosts: Post[] = [];

  onTabChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    switch (tab) {
      case 'Artist':
        this.init("artist")
        break;
      case 'Genre':
        this.init("genre")
        break;
      case 'Song':
        this.init("song")
        break;

    }
  }

  init(id: string) {
    let counter = 0;
    this.invisiblePosts = [];
    this.visiblePosts = [];
    this.postService.getPosts().subscribe((data: Post[]) => {
      for (let i = 0; i < data.length; i++) {
        switch (id) {
          case "artist":
            if (data[i].artist) {
              if (counter < 5) {
                this.visiblePosts.push(data[i]);
                counter++;
              } else {
                this.invisiblePosts.push(data[i]);
              }
            }
            break;
          case "genre":
            if (data[i].genre) {
              if (counter < 5) {
                this.visiblePosts.push(data[i]);
                counter++;
              } else {
                this.invisiblePosts.push(data[i]);
              }
            }
            break;
          case "song":
            if (data[i].song) {
              if (counter < 5) {
                this.visiblePosts.push(data[i]);
                counter++;
              } else {
                this.invisiblePosts.push(data[i]);
              }
            }
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.init("artist");
  }

  leftSlide() {
    const post = this.invisiblePosts[0];
    const postsContainer = document.querySelector('.posts-container') as HTMLElement;
    if (postsContainer) {
      postsContainer.classList.add('slide');
      postsContainer.style.transform = 'translateX(+320px)';
      setTimeout(() => {
        postsContainer.classList.remove('slide');
        this.invisiblePosts.shift();
        this.visiblePosts.unshift(post);
        const postOut = this.visiblePosts.pop();
        if (postOut) {
          this.invisiblePosts.push(postOut);
        }
        postsContainer.style.transform = 'translateX(0)';
      }, 600);
    }
  }

  rightSlide() {
    const post = this.invisiblePosts[this.invisiblePosts.length - 1];
    const postsContainer = document.querySelector('.posts-container') as HTMLElement;
    if (postsContainer) {
      postsContainer.classList.add('slide');
      postsContainer.style.transform = 'translateX(-320px)';
      setTimeout(() => {
        postsContainer.classList.remove('slide');
        this.invisiblePosts.pop();
        this.visiblePosts.push(post);
        const postOut = this.visiblePosts.shift();
        if (postOut) {
          this.invisiblePosts.unshift(postOut);
        }
        postsContainer.style.transform = 'translateX(0)';
      }, 600);
    }
  }
}
