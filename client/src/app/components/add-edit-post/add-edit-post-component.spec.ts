import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPostComponent } from './add-edit-post-component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GifService } from '../../services/GifService/gif.service';
import { PostService } from '../../services/PostService/post.service';
import { JwtService } from '../../services/JwtService/jwt.service';
import { SongService } from '../../services/SongService/song.service';
import { GenreService } from '../../services/GenreService/genre.service';
import { ArtistService } from '../../services/ArtistService/artist.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {ElementRef} from "@angular/core";
import {Post} from "../../models/Post";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AddEditPostComponent', () => {
  let component: AddEditPostComponent;
  let fixture: ComponentFixture<AddEditPostComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };
  let mockLocation = { back: jasmine.createSpy('back') };
  let mockGifService = { searchGif: jasmine.createSpy('searchGif').and.returnValue(of({ results: [{ media_formats: { gif: { url: 'testUrl' } } }] })) };
  let mockPostService = { getPost: jasmine.createSpy('getPost').and.returnValue(of({})), updatePost: jasmine.createSpy('updatePost').and.returnValue(of({})), createPost: jasmine.createSpy('createPost').and.returnValue(of({ id: 1 })) };
  let mockJwtService = { getMe: jasmine.createSpy('getMe').and.returnValue(of({})) };
  let mockSongService = { getSongs: jasmine.createSpy('getSongs').and.returnValue(of([])) };
  let mockGenreService = { getGenres: jasmine.createSpy('getGenres').and.returnValue(of([])) };
  let mockArtistService = { getArtists: jasmine.createSpy('getArtists').and.returnValue(of([])) };

  let AddEditPostComponentMock: Partial<AddEditPostComponent>;

  beforeEach(async () => {
    AddEditPostComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      searchGif: jasmine.createSpy('searchGif'),
      selectGif: jasmine.createSpy('selectGif'),
      savePost: jasmine.createSpy('savePost'),
      ngAfterViewInit: jasmine.createSpy('ngAfterViewInit'),
      ngOnInit: jasmine.createSpy('ngOnInit'),
    }
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        { provide: GifService, useValue: mockGifService },
        { provide: PostService, useValue: mockPostService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: SongService, useValue: mockSongService },
        { provide: GenreService, useValue: mockGenreService },
        { provide: ArtistService, useValue: mockArtistService },
        { provide: AddEditPostComponent, useValue: AddEditPostComponentMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the component and load post data', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: {
        id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [],
        premium: false,
        followers: []
      }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] };
    mockPostService.getPost.and.returnValue(of(post));
    component.ngOnInit();
    expect(component.post).toEqual(post);
    expect(component.formGroup.controls.title.value).toBe(post.title);
    expect(component.formGroup.controls.content.value).toBe(post.content);
    expect(component.formGroup.controls.imageUrl.value).toBe(post.image);
    expect(component.formGroup.controls.songOrGenreOrArtist.value).toEqual(post.song!);
  });

  it('should handle error when loading post data', () => {
    mockPostService.getPost.and.returnValue(of(undefined));
    component.ngOnInit();
    expect(component.post).toBeUndefined();
  });

  it('should set image dimensions after view init', () => {
    component.uploadedImage = { nativeElement: { height: 100, width: 100 } } as ElementRef;
    component.ngAfterViewInit();
    expect(component.imageHeight).toBe(100);
    expect(component.imageWidth).toBe(100);
  });

  it('should not set image dimensions if uploadedImage is undefined', () => {
    component.uploadedImage = undefined;
    component.ngAfterViewInit();
    expect(component.imageHeight).toBe(0);
    expect(component.imageWidth).toBe(0);
  });

  it('should navigate back', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should search for gifs and set the results', () => {
    component.gifSearchString = 'test';
    component.searchGif();
    expect(component.gifSearchResults).toEqual(['testUrl']);
    expect(component.formGroup.controls.imageUrl.value).toBe('testUrl');
  });

  //ERORR
  it('should handle error when searching for gifs', () => {
    mockGifService.searchGif.and.returnValue(of({ results: [] }));
    component.gifSearchString = 'test';
    component.searchGif();
    expect(component.gifSearchResults).toEqual([]);
    expect(component.formGroup.controls.imageUrl.value).toBe(undefined);
  });

  it('should create a new post', () => {
    component.post = undefined;
    component.formGroup.controls.title.setValue('Test');
    component.formGroup.controls.content.setValue('Content');
    component.formGroup.controls.imageUrl.setValue('Image');
    component.formGroup.controls.songOrGenreOrArtist.setValue({ id: 1, name: 'Artist', description: 'Description', image: 'Image' });
    component.showedType = 'Song';
    component.savePost();
    expect(mockJwtService.getMe).toHaveBeenCalled();
    expect(mockPostService.createPost).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/post/1']);
  });

  it('should handle error when creating a new post', () => {
    mockJwtService.getMe.and.returnValue(of(undefined));
    component.savePost();
    expect(mockPostService.createPost).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should select a gif and set the imageUrl control value', () => {
    const gifString = 'gifUrl';
    component.selectGif(gifString);
    expect(component.formGroup.controls.imageUrl.value).toBe(gifString);
  });
});
