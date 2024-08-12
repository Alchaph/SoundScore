import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../../models/Post';
import { environment } from '../../../environments/environments';
import {HttpService} from "../HttpService/http.service";
import {Artist} from "../../models/Artist";

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(() => {
    httpServiceMock = {
      getHttpOptions: () => {
        return {
          headers: {
            Authorization: `Bearer null`
          }
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, { provide: HttpService, useValue: httpServiceMock }]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('createPost should post and return the post', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.createPost(mockPost).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.url}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });

  it('createPost should throw an error with invalid http Options', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.createPost(mockPost).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('updatePost should put and return the updated post', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.updatePost(mockPost).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.url}/posts`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockPost);
  });

  it('updatePost should throw an error with invalid http Options', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.updatePost(mockPost).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts`);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('deletePost should delete and return the post', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.deletePost(mockPost.id!).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.url}/posts/${mockPost.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockPost);
  });

  it('deletePost should throw an error with invalid http Options', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.deletePost(mockPost.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts/${mockPost.id}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getPosts should get and return all posts', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Post One', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
          id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
          premium: false,
          followers: []
        }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] },
      { id: 2, title: 'Test Post Two', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
          id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
          premium: false,
          followers: []
        }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] }
    ];
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.url}/posts/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('getPosts should throw an error with invalid http Options', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Post One', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
          id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
          premium: false,
          followers: []
        }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] },
      { id: 2, title: 'Test Post Two', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
          id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
          premium: false,
          followers: []
        }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] }
    ];
    service.getPosts().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getPost should get and return a single post by ID', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.getPost(mockPost.id!).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.url}/posts/${mockPost.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('getPost should throw an error with invalid http Options', () => {
    const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    service.getPost(mockPost.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts/${mockPost.id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('likeOrDislikePost should post and return a boolean', () => {
    const postId = 1;
    const like = true;
    service.likeOrDislikePost({ id: postId } as Post, like).subscribe(result => {
      expect(result).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.url}/posts/like/${postId}`);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('likeOrDislike should throw an error with invalid http Options', () => {
    const postId = 1;
    const like = true;
    service.likeOrDislikePost({id: postId} as Post, like).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/posts/like/${postId}`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
