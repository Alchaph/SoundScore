import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditSongComponent } from './add-edit-song.component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GifService } from '../../services/GifService/gif.service';
import { SongService } from '../../services/SongService/song.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { GenreService } from '../../services/GenreService/genre.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Artist } from '../../models/Artist';
import { User } from '../../models/User';
import { Song } from '../../models/Song';
import { Genre } from '../../models/Genre';
import { ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditSongComponent', () => {
  let component: AddEditSongComponent;
  let fixture: ComponentFixture<AddEditSongComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockActivatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };
  let mockLocation = { back: jasmine.createSpy('back') };
  let mockGifService = { searchGif: jasmine.createSpy('searchGif').and.returnValue(of({ results: [{ media_formats: { gif: { url: 'testUrl' } } }] })) };
  let mockSongService = { getSong: jasmine.createSpy('getSong').and.returnValue(of({})), createEditSong: jasmine.createSpy('createEditSong').and.returnValue(of({})) };
  let mockJwtService = { getMe: jasmine.createSpy('getMe').and.returnValue(of({})) };
  let mockGenreService = { getGenres: jasmine.createSpy('getGenres').and.returnValue(of([])) };

  let AddEditSongComponentMock: Partial<AddEditSongComponent>;

  beforeEach(async () => {
    AddEditSongComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      searchGif: jasmine.createSpy('searchGif'),
      selectGif: jasmine.createSpy('selectGif'),
      saveSong: jasmine.createSpy('saveSong'),
      ngAfterViewInit: jasmine.createSpy('ngAfterViewInit'),
      ngOnInit: jasmine.createSpy('ngOnInit'),
    }
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        { provide: GifService, useValue: mockGifService },
        { provide: SongService, useValue: mockSongService },
        { provide: JwtServiceService, useValue: mockJwtService },
        { provide: GenreService, useValue: mockGenreService },
        { provide: AddEditSongComponent, useValue: AddEditSongComponentMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the component and load song data', () => {
    const song: Song = { title: 'Test', image: 'Image', link: 'Link', genre: {id: 1} as Genre, artist: {id: 1} as Artist };
    const user: User = { id: 1, artist: { id: 1 } as Artist, password: 'password', email: 'email', username: 'username', notifications: [] };
    mockSongService.getSong.and.returnValue(of(song));
    mockJwtService.getMe.and.returnValue(of(user));
    component.ngOnInit();
    expect(component.song).toEqual(song);
    expect(component.formGroup.controls.title.value).toBe(song.title);
    expect(component.formGroup.controls.imageUrl.value).toBe(song.image);
    expect(component.formGroup.controls.link.value).toBe(song.link);
    expect(component.formGroup.controls.genre.value).toEqual(song.genre);
    expect(component.user).toEqual(user);
  });

  it('should handle error when loading song data', () => {
    mockSongService.getSong.and.returnValue(of(undefined));
    component.ngOnInit();
    expect(component.song).toEqual({} as Song);
    expect(component.formGroup.controls.title.value).toBe(undefined);
    expect(component.formGroup.controls.imageUrl.value).toBe(undefined);
    expect(component.formGroup.controls.link.value).toBe(undefined);
    expect(component.formGroup.controls.genre.value).toBe(undefined);
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

  it('should throw error when navigating back fails', () => {
    mockLocation.back = jasmine.createSpy('back').and.throwError('error');
    expect(() => component.goBack()).toThrow();
  });

  it('should search for gifs and set the results', () => {
    component.gifSearchString = 'test';
    component.searchGif();
    console.log(component.gifSearchResults);
    expect(component.gifSearchResults).toContain('testUrl');
  });

  it('should handle error when searching for gifs', () => {
    mockGifService.searchGif.and.returnValue(of({ undefined }));
    component.gifSearchString = '';
    component.searchGif();
    expect(component.gifSearchResults).toEqual([]);
    expect(component.formGroup.controls.imageUrl.value).toBe(undefined);
  });

  it('should select a gif and set the imageUrl control value', () => {
    const gifString = 'gifUrl';
    component.selectGif(gifString);
    expect(component.formGroup.controls.imageUrl.value).toBe(gifString);
  });

  it('should not set imageUrl control value if gifString is empty', () => {
    const gifString = '';
    component.selectGif(gifString);
    expect(component.formGroup.controls.imageUrl.value).toBe('');
  });

  it('should create a new song when form is valid and user is an artist', () => {
    const user: User = { id: 1, artist: { id: 1 } as Artist, password: 'password', email: 'email', username: 'username', notifications: [] };
    component.user = user;
    component.formGroup.controls.title.setValue('Test');
    component.formGroup.controls.imageUrl.setValue('Image');
    component.formGroup.controls.link.setValue('Link');
    component.formGroup.controls.genre.setValue({});
    component.saveSong();
    expect(mockSongService.createEditSong).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/userProfile/1/1']);
  });

  it('should not create a new song when form is invalid or user is not an artist', () => {
    const user: User = { id: 1, artist: undefined, password: 'password', email: 'email', username: 'username', notifications: [] };
    component.user = user;
    component.formGroup.controls.title.setValue('1');
    component.saveSong();
    expect(mockSongService.createEditSong).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});

