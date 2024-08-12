import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CommentService} from './comment.service';
import {environment} from "../../../environments/environments";
import {Comment} from "../../models/Comment";

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createComment should post and return the comment', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.createComment(mockComment).subscribe(comment => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne(`${environment.url}/comments`);
    expect(req.request.method).toBe('POST');
    req.flush(mockComment);
  });

  it('createComment should throw an error with invalid http Options', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.createComment(mockComment).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/comments`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'), {status: 401});
  });

  it('updateComment should update and return the comment', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.updateComment(mockComment).subscribe(comment => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne(`${environment.url}/comments`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockComment);
  });

  it('updateComment should throw an error with invalid http Options', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.updateComment(mockComment).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/comments`);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Unauthorized'), {status: 401});
  });

  it('deleteComment should delete the comment', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.deleteComment(mockComment.id!).subscribe(response => {
      expect(response).toEqual(mockComment);
    });

    const req = httpMock.expectOne(`${environment.url}/comments/${mockComment.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockComment);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deleteComment should throw an error with invalid http Options', () => {
    const mockComment: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    };
    service.deleteComment(mockComment.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/comments/${mockComment.id}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Unauthorized'), {status: 401});
  });

  it('getCommentsOfPost should return the comment of the post', () => {
    const mockPostId = 1;
    const mockComments: Comment[] = [
      {
        id: 1,
        title: 'Test Title',
        message: 'This is a test comment message.',
        post: {
          id: 1,
          title: 'Test Post',
          content: 'This is a test post content',
          user: {
            id: 1,
            username: 'Test User',
            email: 'test@example.com',
            password: 'password',
            artist: {
              id: 1,
              name: 'Test Artist',
              description: 'This is a test artist description.',
              image: 'test-artist.jpg'
            },
            notifications: [],
            premium: false,
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        },
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
      },
      {
        id: 2,
        title: 'Second Test Title',
        message: 'This is a second test comment message.',
        post: {
          id: 1,
          title: 'Test Post',
          content: 'This is a test post content',
          user: {
            id: 1,
            username: 'Test User',
            email: 'test@example.com',
            password: 'password',
            artist: {
              id: 1,
              name: 'Test Artist',
              description: 'This is a test artist description.',
              image: 'test-artist.jpg'
            },
            notifications: [],
            premium: false,
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        },
        user: {
          id: 2,
          username: 'Second Test User',
          email: 'secondtest@example.com',
          password: 'password2',
          artist: {
            id: 2,
            name: 'Second Test Artist',
            description: 'This is a second test artist description.',
            image: 'second-test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
      }
    ];
    service.getCommentsOfPost(mockPostId).subscribe(comment => {
      expect(comment).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${environment.url}/comments/commentsByPostId/${mockPostId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('getCommentsOfPost should throw an error with invalid http Options', () => {
    const mockPostId = 1;
    const mockComments: Comment[] = [
      {
        id: 1,
        title: 'Test Title',
        message: 'This is a test comment message.',
        post: {
          id: 1,
          title: 'Test Post',
          content: 'This is a test post content',
          user: {
            id: 1,
            username: 'Test User',
            email: 'test@example.com',
            password: 'password',
            artist: {
              id: 1,
              name: 'Test Artist',
              description: 'This is a test artist description.',
              image: 'test-artist.jpg'
            },
            notifications: [],
            premium: false,
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        },
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
      },
      {
        id: 2,
        title: 'Second Test Title',
        message: 'This is a second test comment message.',
        post: {
          id: 1,
          title: 'Test Post',
          content: 'This is a test post content',
          user: {
            id: 1,
            username: 'Test User',
            email: 'test@example.com',
            password: 'password',
            artist: {
              id: 1,
              name: 'Test Artist',
              description: 'This is a test artist description.',
              image: 'test-artist.jpg'
            },
            notifications: [],
            premium: false,
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        },
        user: {
          id: 2,
          username: 'Second Test User',
          email: 'secondtest@example.com',
          password: 'password2',
          artist: {
            id: 2,
            name: 'Second Test Artist',
            description: 'This is a second test artist description.',
            image: 'second-test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
      }
    ];
    service.getCommentsOfPost(mockPostId).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/comments/commentsByPostId/${mockPostId}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), {status: 401});
  });
  it('getCommentTree should return the comment tree', () => {
    const mockComment1: Comment = {
      id: 1,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: '',
          password: '',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 1,
        username: 'Test User',
        email: '',
        password: '',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    }
    const mockComment2: Comment = {
      id: 2,
      title: 'Test Title',
      message: 'This is a test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      parent: mockComment1,
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'password',
        artist: {
          id: 1,
          name: 'Test Artist',
          description: 'This is a test artist description.',
          image: 'test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    }
    const mockComments3: Comment = {
      id: 3,
      title: 'Second Test Title',
      message: 'This is a second test comment message.',
      post: {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content',
        user: {
          id: 1,
          username: 'Test User',
          email: 'test@example.com',
          password: 'password',
          artist: {
            id: 1,
            name: 'Test Artist',
            description: 'This is a test artist description.',
            image: 'test-artist.jpg'
          },
          notifications: [],
          premium: false,
          followers: []
        },
        likes: [],
        dislikes: [],
        image: ''
      },
      user: {
        id: 2,
        username: 'Second Test User',
        email: 'secondtest@example.com',
        password: 'password2',
        artist: {
          id: 2,
          name: 'Second Test Artist',
          description: 'This is a second test artist description.',
          image: 'second-test-artist.jpg'
        },
        notifications: [],
        premium: false,
        followers: []
      },
    }
    const mockComments: Comment[] = [
      mockComment1,
      mockComment2,
      mockComments3
    ];
    mockComment1.children?.push(mockComment2);
    const expectedComments: Comment[] = [
      mockComment1,
      mockComments3
    ]
    const rootComments: Comment[] = service.buildCommentTree(mockComments);
    expect(rootComments).toEqual(
      expectedComments);
  });
});
