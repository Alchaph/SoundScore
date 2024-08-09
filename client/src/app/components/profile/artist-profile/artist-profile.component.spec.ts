import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistProfileComponent } from './artist-profile.component';
import { JwtServiceService } from "../../../services/JwtService/jwt-service.service";
import { SongService } from "../../../services/SongService/song.service";
import { ArtistService } from "../../../services/ArtistService/artist.service";
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs';
import { User } from '../../../models/User';
import { Artist } from '../../../models/Artist';
import { Song } from '../../../models/Song';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {UserInformationService} from "../../../services/UserInformationService/user-information.service";

describe('ArtistProfileComponent', () => {
  let component: ArtistProfileComponent;
  let fixture: ComponentFixture<ArtistProfileComponent>;
  let jwtServiceMock = {
    getMe: jasmine.createSpy('getMe').and.returnValue(of({ email: 'test@example.com', username: 'testuser', password: 'password', artist: null, notifications: [], id: 1, premium: false } as unknown as User)),
    verifyPassword: jasmine.createSpy('verifyPassword').and.returnValue(of(true)),
    authenticate: jasmine.createSpy('authenticate').and.returnValue(of(true)),
    updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
    login: jasmine.createSpy('login').and.returnValue(of({ token: 'dummy-token' })),
    deleteMe: jasmine.createSpy('deleteMe').and.returnValue(of({ username: 'testuser' })),
    getUserByArtistId: jasmine.createSpy('getUserByArtistId').and.returnValue(of({ id: 1 } as User)),
    getUserById: jasmine.createSpy('getUserById').and.returnValue(of({ id: 1 } as User))
  };
  let songServiceMock: any;
  let artistServiceMock: any;
  let routeMock: any;
  let userInformationServiceMock = {
    setMessage: jasmine.createSpy('setMessage')
  };

  let ArtistProfileComponentMock: Partial<ArtistProfileComponent>;

  beforeEach(async () => {
    ArtistProfileComponentMock = {
      openLink: jasmine.createSpy('openLink'),
      deleteSong: jasmine.createSpy('deleteSong'),
      init: jasmine.createSpy('init')
    };
    songServiceMock = jasmine.createSpyObj('SongService', ['getSongs', 'deleteSong']);
    artistServiceMock = jasmine.createSpyObj('ArtistService', ['getArtist']);
    routeMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
      HttpClientModule],
      providers: [
        { provide: JwtServiceService, useValue: jwtServiceMock },
        { provide: SongService, useValue: songServiceMock },
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: ArtistProfileComponent, useValue: ArtistProfileComponentMock },
        { provide: UserInformationService, useValue: userInformationServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open a new tab with the given link', () => {
    spyOn(window, 'open');
    const link = 'http://example.com';
    component.openLink(link);
    expect(window.open).toHaveBeenCalledWith(link, '_blank');
  });

  it('should not open a new tab if link is undefined', () => {
    spyOn(window, 'open');
    component.openLink(undefined);
    expect(window.open).not.toHaveBeenCalled();
  });

  it('should delete the song and call init', () => {
    songServiceMock.deleteSong.and.returnValue(of({}));
    spyOn(component, 'init');

    component.deleteSong(1);

    expect(songServiceMock.deleteSong).toHaveBeenCalledWith(1);
    expect(component.artistSongs).toEqual([]);
    expect(component.init).toHaveBeenCalled();
  });

  it('should handle error when deleting song', () => {
    songServiceMock.deleteSong.and.returnValue(of(new Error('Error deleting song')));
    spyOn(component, 'init');

    component.deleteSong(1);

    expect(songServiceMock.deleteSong).toHaveBeenCalledWith(1);
    expect(component.artistSongs).toEqual([]);
    expect(component.init).toHaveBeenCalled();
  });

  it('should initialize the component correctly', () => {
    const user: User = { id: 1, artist: { id: 2 } } as User;
    const artist: Artist = { id: 2, name: 'Artist' } as Artist;
    const songs: Song[] = [{ id: 1, artist: artist } as Song];

    jwtServiceMock.getUserById.and.returnValue(of(user));
    jwtServiceMock.getMe.and.returnValue(of(user));
    songServiceMock.getSongs.and.returnValue(of(songs));
    artistServiceMock.getArtist.and.returnValue(of(artist));

    component.init();

    expect(jwtServiceMock.getUserById).toHaveBeenCalledWith(1);
    expect(jwtServiceMock.getMe).toHaveBeenCalled();
    expect(songServiceMock.getSongs).toHaveBeenCalled();
    expect(artistServiceMock.getArtist).toHaveBeenCalledWith(2);
    expect(component.artist).toEqual(artist);
    expect(component.artistSongs).toEqual(songs);
  });

  it('should handle case when user has no artist', () => {
    const user: User = { id: 1, artist: undefined, username: 'username', email: 'email', notifications: [], password: 'password', premium: false } as User;
    const meUser: User = { id: 2, artist: { id: 2, name: 'Artist' } } as User;
    const songs: Song[] = [{ id: 1, artist: { id: 2, name: 'Artist' } as Artist } as Song];

    jwtServiceMock.getUserById.and.returnValue(of(user));
    jwtServiceMock.getMe.and.returnValue(of(meUser));
    songServiceMock.getSongs.and.returnValue(of(songs));

    component.init();

    expect(jwtServiceMock.getUserById).toHaveBeenCalledWith(1);
    expect(jwtServiceMock.getMe).toHaveBeenCalled();
    expect(songServiceMock.getSongs).toHaveBeenCalled();
    expect(artistServiceMock.getArtist).not.toHaveBeenCalled();
    expect(component.artist).toEqual(meUser.artist);
    expect(component.artistSongs).toEqual(songs);
  });

  it('should handle case when getUserById returns an error', () => {
    jwtServiceMock.getUserById.and.returnValue(of(undefined));

    component.init();

    expect(jwtServiceMock.getUserById).toHaveBeenCalledWith(1);
    expect(jwtServiceMock.getMe).not.toHaveBeenCalled();
    expect(songServiceMock.getSongs).not.toHaveBeenCalled();
    expect(artistServiceMock.getArtist).not.toHaveBeenCalled();
  });
});
