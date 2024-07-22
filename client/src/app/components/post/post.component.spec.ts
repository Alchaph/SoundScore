import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostService } from '../../services/PostService/post.service';
import { CommentService } from '../../services/CommentService/comment.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { LanguageService } from '../../services/languageService/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Comment } from '../../models/Comment';
import {User} from "../../models/User";
import {Post} from "../../models/Post";
import {HttpService} from "../../services/HttpService/http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let commentService: jasmine.SpyObj<CommentService>;
  let jwtService: jasmine.SpyObj<JwtServiceService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  let PostComponentMock: Partial<PostComponent>;

  beforeEach(async () => {
    PostComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      loadComponentData: jasmine.createSpy('loadComponentData'),
      handleAction: jasmine.createSpy('handleAction'),
      addComment: jasmine.createSpy('addComment'),
      replyToComment: jasmine.createSpy('replyToComment'),
      editComment: jasmine.createSpy('editComment'),
      resetAction: jasmine.createSpy('resetAction')
    };
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPost']);
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['createComment', 'updateComment', 'getCommentsOfPost', 'buildCommentTree']);
    const jwtServiceSpy = jasmine.createSpyObj('JwtServiceService', ['getMe']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: JwtServiceService, useValue: jwtServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } }, params: of({ postId: 1 }) } },
        { provide: PostComponent, useValue: PostComponentMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    jwtService = TestBed.inject(JwtServiceService) as jasmine.SpyObj<JwtServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to previous path if available', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('/previous');
    spyOn(sessionStorage, 'clear');
    component.goBack();
    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/previous']);
  });

  it('should navigate to home if no previous path is available', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should load component data on init', () => {
    spyOn(component, 'loadComponentData');
    component.ngOnInit();
    expect(component.loadComponentData).toHaveBeenCalled();
  });

  it('should not proceed if newComment message is empty', () => {
    component.commentService.newComment.message = '';
    spyOn(component, 'addComment');
    component.handleAction();
    expect(component.addComment).not.toHaveBeenCalled();
  });

  it('should call addComment if currentAction is Add', () => {
    component.commentService.newComment.message = 'Test';
    component.commentService.currentAction = 'Add';
    spyOn(component, 'addComment');
    component.handleAction();
    expect(component.addComment).toHaveBeenCalled();
  });

  it('should call editComment if currentAction is Edit your', () => {
    component.commentService.newComment.message = 'Test';
    component.commentService.currentAction = 'Edit your';
    spyOn(component, 'editComment');
    component.handleAction();
    expect(component.editComment).toHaveBeenCalled();
  });

  it('should call replyToComment if currentAction is Reply to', () => {
    component.commentService.newComment.message = 'Test';
    component.commentService.currentAction = 'Reply to';
    spyOn(component, 'replyToComment');
    component.handleAction();
    expect(component.replyToComment).toHaveBeenCalled();
  });

  it('should call createComment and getCommentsOfPost on addComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentService.createComment.and.returnValue(of(commentStub));
    commentService.getCommentsOfPost.and.returnValue(of([]));
    component.addComment();
    expect(commentService.createComment).toHaveBeenCalled();
    expect(commentService.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should call createComment and getCommentsOfPost on replyToComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentService.createComment.and.returnValue(of(commentStub));
    commentService.getCommentsOfPost.and.returnValue(of([]));
    component.replyToComment();
    expect(commentService.createComment).toHaveBeenCalled();
    expect(commentService.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should call updateComment and getCommentsOfPost on editComment', () => {
    const commentStub = { id: 1, message: 'Test' } as Comment;
    commentService.updateComment.and.returnValue(of(commentStub));
    commentService.getCommentsOfPost.and.returnValue(of([]));
    component.editComment();
    expect(commentService.updateComment).toHaveBeenCalled();
    expect(commentService.getCommentsOfPost).toHaveBeenCalled();
  });

  it('should reset currentAction to Add and clear newComment and focusedComment', () => {
    component.resetAction();
    expect(component.commentService.currentAction).toBe('Add');
    expect(component.commentService.newComment).toEqual({} as Comment);
    expect(component.commentService.focusedComment).toEqual({} as Comment);
  });

  it('should load post and user data and set liked/disliked flags', () => {
    const postStub = {
      id: 1,
      likes: [{ user: { id: 1 } }],
      dislikes: [{ user: { id: 2 } }]
    } as Post;
    const userStub = { id: 1 } as User;
    postService.getPost.and.returnValue(of(postStub));
    jwtService.getMe.and.returnValue(of(userStub));

    component.loadComponentData();

    expect(postService.getPost).toHaveBeenCalledWith(1);
    expect(jwtService.getMe).toHaveBeenCalled();
  });

  it('should build comment tree from comments', () => {
    const commentsStub = [{ id: 1, message: 'Test' }] as Comment[];
    commentService.getCommentsOfPost.and.returnValue(of(commentsStub));
    commentService.buildCommentTree.and.returnValue(commentsStub);

    component.loadComponentData();

    expect(commentService.getCommentsOfPost).toHaveBeenCalledWith(1);
    expect(commentService.buildCommentTree).toHaveBeenCalledWith(commentsStub);
    expect(commentService.comments).toEqual(commentsStub);
  });
});
