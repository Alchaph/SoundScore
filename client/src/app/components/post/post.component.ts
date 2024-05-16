import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    FormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];
  //TODO add user id and comment id
  postId = Number(this.route.snapshot.paramMap.get('postId'));

  //TODO MAKE IT WORK
  newComment: Comment = {title: '', message: '', post: {
  id: 1,
  likes: 10,
  dislikes: 2,
  title: 'Mock Post 1',
  content: 'This is the content for Mock Post 1',
  image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
  user: {
    id: 1,
    username: 'testUser1',
    email: 'test1@example.com',
    password: 'testPassword1',
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-01-01'),
    enabled: true,
    authorities: [],
    accountNonLocked: true,
    credentialsNonExpired: true,
    accountNonExpired: true,
  },
  genre: {
    id: 1,
    name: 'Genre 1',
    description: 'This is Genre 1'
  },
  artist: {
    id: 1,
    name: 'testArtist1',
    description: 'This is test artist 1',
    image: 'https://example.com/artist1.jpg'
  },
  song: {
    id: 1,
    title: 'Song 1',
    image: 'https://example.com/song1.jpg',
    link: 'https://example.com/song1.mp3',
    genre: {
      id: 1,
      name: 'Genre 1',
      description: 'This is Genre 1'
    },
    artist: {
      id: 1,
      name: 'testArtist1',
      description: 'This is test artist 1',
      image: 'https://example.com/artist1.jpg'
    }
}
    }, user: {
      id: 1,
      username: 'testUser1',
      email: 'test1@example.com',
      password: 'testPassword1',
      created_at: new Date('2022-01-01'),
      updated_at: new Date('2022-01-01'),
      enabled: true,
      authorities: [],
      accountNonLocked: true,
      credentialsNonExpired: true,
      accountNonExpired: true,
    } }
  constructor(private route: ActivatedRoute, private postService: PostService, private commentService : CommentService) { }

  ngOnInit(): void {
    console.log(this.newComment)
    this.postService.getPost(this.postId).subscribe((post) => {
      this.post = post;
    });
    this.commentService.getCommentsOfPost(this.postId).subscribe((comments) => {
      this.comments = comments;
      console.log(comments)
    });
  }
  addComment(): void {
    if (!this.newComment.title || !this.newComment.message) {
      return;
    }
    //TODO add user id
    this.commentService.createComment(this.newComment).subscribe(comment => {
      this.comments.push(<Comment>comment);
      this.newComment.title = '';
      this.newComment.message = '';
    });
  }
}
