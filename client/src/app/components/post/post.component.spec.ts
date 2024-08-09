import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostService } from '../../services/PostService/post.service';
import { CommentService } from '../../services/CommentService/comment.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Comment } from '../../models/Comment';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { HttpClientModule } from '@angular/common/http';
import { Artist } from "../../models/Artist";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let routeMock: any;
  let postComponentMock: Partial<PostComponent>;

  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  };
  let postServiceMock = {
    getPost: jasmine.createSpy('getPost').and.returnValue(of({ id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: { id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [], premium: false, followers: [] }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] }))
  };
  let commentServiceMock = {
    getCommentsOfPost: jasmine.createSpy('getCommentsOfPost').and.returnValue(of([])),
    createComment: jasmine.createSpy('createComment').and.returnValue(of({})),
    updateComment: jasmine.createSpy('updateComment').and.returnValue(of({})),
    buildCommentTree: jasmine.createSpy('buildCommentTree').and.returnValue([]),
  };
  let jwtServiceMock = {
    getMe: jasmine.createSpy('getMe').and.returnValue(of({ email: 'test@example.com', username: 'testuser', password: 'password', artist: null, notifications: [], id: 1, premium: false, followers: [] } as unknown as User)),
    verifyPassword: jasmine.createSpy('verifyPassword').and.returnValue(of(true)),
    authenticate: jasmine.createSpy('authenticate').and.returnValue(of(true)),
    updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
    login: jasmine.createSpy('login').and.returnValue(of({ token: 'dummy-token' })),
    deleteMe: jasmine.createSpy('deleteMe').and.returnValue(of({ username: 'testuser' })),
    getUserByArtistId: jasmine.createSpy('getUserByArtistId').and.returnValue(of({ id: 1 } as User)),
    getUserById: jasmine.createSpy('getUserById').and.returnValue(of({ id: 1 } as User))
  };

  beforeEach(async () => {
    postComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      loadComponentData: jasmine.createSpy('loadComponentData'),
      handleAction: jasmine.createSpy('handleAction'),
      addComment: jasmine.createSpy('addComment'),
      replyToComment: jasmine.createSpy('replyToComment'),
      editComment: jasmine.createSpy('editComment'),
      resetAction: jasmine.createSpy('resetAction'),
    };

    routeMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: CommentService, useValue: commentServiceMock },
        { provide: JwtServiceService, useValue: jwtServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: PostComponent, useValue: postComponentMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    routerMock.navigate.calls.reset();
    postServiceMock.getPost.calls.reset();
    commentServiceMock.getCommentsOfPost.calls.reset();
    commentServiceMock.createComment.calls.reset();
    commentServiceMock.updateComment.calls.reset();
    jwtServiceMock.getMe.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to previous path if available', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('/previous');
    spyOn(sessionStorage, 'clear');
    component.goBack();
    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/previous']);
  });

  it('should navigate to home if no previous path is available', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should load component data on init', () => {
    spyOn(component, 'loadComponentData');
    component.ngOnInit();
    expect(component.loadComponentData).toHaveBeenCalled();
  });

  it('should not proceed if newComment message is empty', () => {
    component.commentService.newComment = { message: '' } as Comment;
    spyOn(component, 'addComment');
    component.handleAction();
    expect(component.addComment).not.toHaveBeenCalled();
  });

  it('should call addComment if currentAction is Add', () => {
    component.commentService.newComment = { message: 'Test' } as Comment;
    component.commentService.currentAction = 'Add';
    spyOn(component, 'addComment');
    component.handleAction();
    expect(component.addComment).toHaveBeenCalled();
  });

  it('should call editComment if currentAction is Edit', () => {
    component.commentService.newComment = { message: 'Test' } as Comment;
    component.commentService.currentAction = 'Edit your';
    spyOn(component, 'editComment');
    component.handleAction();
    expect(component.editComment).toHaveBeenCalled();
  });

  it('should call replyToComment if currentAction is Reply', () => {
    component.commentService.newComment = { message: 'Test' } as Comment;
    component.commentService.currentAction = 'Reply to';
    spyOn(component, 'replyToComment');
    component.handleAction();
    expect(component.replyToComment).toHaveBeenCalled();
  });

  it('should call createComment and getCommentsOfPost on addComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentServiceMock.createComment.and.returnValue(of(commentStub));
    commentServiceMock.getCommentsOfPost.and.returnValue(of([]));
    component.addComment();
    expect(commentServiceMock.createComment).toHaveBeenCalled();
    expect(commentServiceMock.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should call createComment and getCommentsOfPost on replyToComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentServiceMock.createComment.and.returnValue(of(commentStub));
    commentServiceMock.getCommentsOfPost.and.returnValue(of([]));
    component.replyToComment();
    expect(commentServiceMock.createComment).toHaveBeenCalled();
    expect(commentServiceMock.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should call updateComment and getCommentsOfPost on editComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentServiceMock.updateComment.and.returnValue(of(commentStub));
    commentServiceMock.getCommentsOfPost.and.returnValue(of([]));
    component.editComment();
    expect(commentServiceMock.updateComment).toHaveBeenCalled();
    expect(commentServiceMock.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should reset currentAction to Add and clear newComment and focusedComment', () => {
    component.resetAction();
    expect(component.commentService.currentAction).toBe('Add');
    expect(component.commentService.newComment).toEqual({} as Comment);
    expect(component.commentService.focusedComment).toEqual({} as Comment);
  });

  it('should build comment tree from comments', () => {
    const commentsStub = [{ id: 1, message: 'Test' }] as Comment[];
    commentServiceMock.getCommentsOfPost.and.returnValue(of(commentsStub));
    commentServiceMock.buildCommentTree.and.returnValue(commentsStub);
    component.loadComponentData();
    expect(commentServiceMock.getCommentsOfPost).toHaveBeenCalledWith(1);
    expect(commentServiceMock.buildCommentTree).toHaveBeenCalledWith(commentsStub);
  });
});
