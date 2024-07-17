import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentService } from '../../services/CommentService/comment.service';
import { LanguageService } from '../../services/languageService/language.service';
import { Comment } from '../../models/Comment';
import { User } from '../../models/User';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentServiceMock: Partial<CommentService>;

  beforeEach(async () => {
    commentServiceMock = {
      currentAction: '',
      newComment: {} as Comment,
      deleteComment: jasmine.createSpy('deleteComment').and.returnValue(of({})),
      getCommentsOfPost: jasmine.createSpy('getCommentsOfPost').and.returnValue(of([])),
      buildCommentTree: jasmine.createSpy('buildCommentTree').and.returnValue([])
    };

    await TestBed.configureTestingModule({
      imports: [ CommentComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMock },
        { provide: LanguageService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentAction to "Edit your" and copy the comment', () => {
    const comment = { id: 1, message: 'Test' } as Comment;
    component.setEditComment(comment);
    expect(commentServiceMock.currentAction).toBe('Edit your');
    expect(commentServiceMock.newComment).toEqual(comment);
  });

  it('should handle setEditComment with undefined comment', () => {
    component.setEditComment(undefined as unknown as Comment);
    expect(commentServiceMock.currentAction).toBe('Edit your');
    expect(commentServiceMock.newComment).toEqual({} as Comment);
  });

  it('should set currentAction to "Reply to" and copy the comment', () => {
    const comment = { id: 1, message: 'Test' } as Comment;
    commentServiceMock.newComment = { message: 'Reply' } as Comment;
    component.setReplyComment(comment);
    expect(commentServiceMock.currentAction).toBe('Reply to');
    expect(commentServiceMock.newComment.parent).toEqual(comment);
  });

  it('should handle setReplyComment with undefined comment', () => {
    commentServiceMock.newComment = { message: 'Reply' } as Comment;
    component.setReplyComment(undefined as unknown as Comment);
    expect(commentServiceMock.currentAction).toBe('Reply to');
    expect(commentServiceMock.newComment.parent).toBeUndefined();
  });

  it('should delete comment and its children', () => {
    const comment = { id: 1, children: [{ id: 2 }] } as Comment;
    component.deleteComment(comment);
    expect(commentServiceMock.deleteComment).toHaveBeenCalledWith(2);
  });

  it('should handle deleteComment with undefined comment id', () => {
    expect(() => component.deleteComment({id: undefined} as Comment)).toThrow(new Error('Comment has no id'));
  });

  it('should remove comment with given id from tree', () => {
    const comments = [
      { id: 1, children: [{ id: 2 }] } as Comment,
      { id: 3 } as Comment
    ];
    const updatedComments = component.removeCommentFromTree(comments, 2);
    expect(updatedComments).toEqual([{ id: 1, children: [] }, { id: 3 }] as Comment[]);
  });

  it('should handle removeCommentFromTree with empty array', () => {
    const comments: Comment[] = [];
    const updatedComments = component.removeCommentFromTree(comments, 1);
    expect(updatedComments).toEqual([]);
  });
});
