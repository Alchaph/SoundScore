import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LikeOrDislikeComponent } from './like-or-dislike.component';
import { PostService } from '../../services/PostService/post.service';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('LikeOrDislikeComponent', () => {
  let component: LikeOrDislikeComponent;
  let fixture: ComponentFixture<LikeOrDislikeComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  let LikeOrDislikeComponentMock: Partial<LikeOrDislikeComponent>;

  beforeEach(async () => {
    LikeOrDislikeComponentMock = {
      postLiked: jasmine.createSpy('postLiked'),
      postDisliked: jasmine.createSpy('postDisliked'),
      likePost: jasmine.createSpy('likePost'),
      dislikePost: jasmine.createSpy('dislikePost'),
      handleLikeDislikeResponse: jasmine.createSpy('handleLikeDislikeResponse')
    };
    const spy = jasmine.createSpyObj('PostService', ['likeOrDislikePost']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot()],
      providers: [{ provide: PostService, useValue: spy }, { provide: LikeOrDislikeComponent, useValue: LikeOrDislikeComponentMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LikeOrDislikeComponent);
    component = fixture.componentInstance;
    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;

    component.activeUser = {id: 1, name: 'User'} as unknown as User;
    component.post = {
      id: 1,
      likes: [],
      dislikes: []
    } as unknown as Post;
  });

  it('should check if post is liked', () => {
    component.post.likes.push({ user: { id: 1 } as User, post: component.post, like: true });
    expect(component.postLiked(component.post)).toBe(true);
    component.post.likes = [];
    expect(component.postLiked(component.post)).toBe(false);
  });

  it('should check if post is disliked', () => {
    component.post.dislikes.push({ user: { id: 1 } as User, post: component.post, like: false });
    expect(component.postDisliked(component.post)).toBe(true);
    component.post.dislikes = [];
    expect(component.postDisliked(component.post)).toBe(false);
  });

  it('should like the post when not disliked', () => {
    postServiceSpy.likeOrDislikePost.and.returnValue(of(true));
    component.likePost(component.post);
    expect(postServiceSpy.likeOrDislikePost).toHaveBeenCalledWith(component.post, true);
    expect(component.post.likes.length).toBe(1);
    expect(component.likeProcessing).toBe(false);
  });

  it('should handle error when liking the post', () => {
    postServiceSpy.likeOrDislikePost.and.returnValue(of(false));
    component.likePost(component.post);
    expect(postServiceSpy.likeOrDislikePost).toHaveBeenCalledWith(component.post, true);
    expect(component.post.likes.length).toBe(0);
    expect(component.likeProcessing).toBe(false);
  });

  it('should dislike the post when not liked', () => {
    postServiceSpy.likeOrDislikePost.and.returnValue(of(true));
    component.dislikePost(component.post);
    expect(postServiceSpy.likeOrDislikePost).toHaveBeenCalledWith(component.post, false);
    expect(component.post.dislikes.length).toBe(1);
    expect(component.likeProcessing).toBe(false);
  });

  it('should handle error when disliking the post', () => {
    postServiceSpy.likeOrDislikePost.and.returnValue(of(false));
    component.dislikePost(component.post);
    expect(postServiceSpy.likeOrDislikePost).toHaveBeenCalledWith(component.post, false);
    expect(component.post.dislikes.length).toBe(0);
    expect(component.likeProcessing).toBe(false);
  });

  it('should handle like or dislike response', () => {
    component.handleLikeDislikeResponse(true, true, component.post);
    expect(component.post.likes.length).toBe(1);
    component.handleLikeDislikeResponse(true, false, component.post);
    expect(component.post.dislikes.length).toBe(1);

    component.handleLikeDislikeResponse(false, true, component.post);
    expect(component.post.likes.length).toBe(0);
    component.handleLikeDislikeResponse(false, false, component.post);
    expect(component.post.dislikes.length).toBe(0);
  });
});
