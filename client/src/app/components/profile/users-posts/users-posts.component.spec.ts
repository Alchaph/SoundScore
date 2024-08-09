import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersPostsComponent } from './users-posts.component';
import { PostService } from '../../../services/PostService/post.service';
import { JwtService } from '../../../services/JwtService/jwt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/Post';
import { User } from '../../../models/User';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";

describe('UsersPostsComponent', () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;
  let postServiceMock: any;
  let jwtServiceMock: any;
  let routerMock: any;
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };

  let UsersPostsComponentMock: Partial<UsersPostsComponent>;

  beforeEach(async () => {
    UsersPostsComponentMock = {
      deletePost: jasmine.createSpy('deletePost'),
      navigateToPost: jasmine.createSpy('navigateToPost')
    };
    postServiceMock = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(of([])),
      deletePost: jasmine.createSpy('deletePost').and.returnValue(of({}))
    };
    jwtServiceMock = {
      getMe: jasmine.createSpy('getMe').and.returnValue(of({ id: 1 } as User))
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      url: '/current/path'
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UsersPostsComponent, useValue: UsersPostsComponentMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init and filter them by userId', () => {
    const mockPosts: Post[] = [
      { id: 1, user: { id: 1 } } as Post,
      { id: 2, user: { id: 2 } } as Post
    ];
    postServiceMock.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(component.posts.length).toBe(1);
    expect(component.posts[0].id).toBe(1);
  });

  it('should handle error when loading posts', () => {
    postServiceMock.getPosts.and.returnValue(of(undefined));

    component.ngOnInit();

    expect(component.posts.length).toBe(0);
  });

  it('should load local userId on init', () => {
    jwtServiceMock.getMe.and.returnValue(of({ id: 1 } as User));

    component.ngOnInit();

    expect(component.localUserId).toBe(1);
  });

  it('should handle error when loading local userId', () => {
    jwtServiceMock.getMe.and.returnValue(of({ undefined } as unknown as User));
    component.localUserId = 0;

    component.ngOnInit();

    expect(component.localUserId).toBe(0);
  });

  it('should delete post and update posts list', () => {
    const post: Post = { id: 1, user: { id: 1 } } as Post;
    component.posts = [post];

    component.deletePost(post);

    expect(postServiceMock.deletePost).toHaveBeenCalledWith(1);
    expect(component.posts.length).toBe(0);
  });

  it('should handle error when deleting post', () => {
    const post: Post = { id: 1, user: { id: 1 } } as Post;
    component.posts = [post];
    postServiceMock.deletePost.and.returnValue(of(undefined));

    component.deletePost(post);

    expect(postServiceMock.deletePost).toHaveBeenCalledWith(1);
    expect(component.posts.length).toBe(0);
  });

  it('should navigate to post', () => {
    const postId = 1;

    component.navigateToPost(postId);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/post/', postId]);
  });

  it('should handle undefined postId in navigateToPost', () => {
    const postId = undefined;

    component.navigateToPost(postId);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/post/', undefined]);
  });
});
