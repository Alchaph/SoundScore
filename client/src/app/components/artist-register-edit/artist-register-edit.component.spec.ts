import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ArtistRegisterEditComponent } from './artist-register-edit.component';
import { ArtistService } from '../../services/ArtistService/artist.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import { Artist } from "../../models/Artist";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {User} from "../../models/User";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ArtistRegisterEditComponent', () => {
  let component: ArtistRegisterEditComponent;
  let fixture: ComponentFixture<ArtistRegisterEditComponent>;
  let mockArtistService = jasmine.createSpyObj('ArtistService', ['getArtist', 'updateArtist', 'createArtist', 'deleteArtist']);
  let mockJwtService = {
    getMe: jasmine.createSpy('getMe').and.returnValue(of({ email: 'test@example.com', username: 'testuser', password: 'password', artist: null, notifications: [], id: 1 } as unknown as User)),
    verifyPassword: jasmine.createSpy('verifyPassword').and.returnValue(of(true)),
    authenticate: jasmine.createSpy('authenticate').and.returnValue(of(true)),
    updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
    login: jasmine.createSpy('login').and.returnValue(of({ token: 'dummy-token' })),
    deleteMe: jasmine.createSpy('deleteMe').and.returnValue(of({ username: 'testuser' })),
    registerArtist: jasmine.createSpy('registerArtist').and.returnValue(of({}))
  };
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserInformationService: jasmine.SpyObj<UserInformationService>;

  let artistRegisterEditComponentMock: Partial<ArtistRegisterEditComponent>;

  beforeEach(async () => {
    artistRegisterEditComponentMock = {
      saveArtist: jasmine.createSpy('saveArtist'),
      deleteYourself: jasmine.createSpy('deleteYourself'),
    };
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get')
        }
      }
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserInformationService = jasmine.createSpyObj('UserInformationService', ['setMessage']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ArtistRegisterEditComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: ArtistService, useValue: mockArtistService },
        { provide: JwtServiceService, useValue: mockJwtService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: UserInformationService, useValue: mockUserInformationService },
        { provide: ArtistRegisterEditComponent, useValue: artistRegisterEditComponentMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getArtist and getMe on ngOnInit', () => {
    const artist: Artist = { id: 1, name: 'Artist', description: 'Description', image: 'Image' };
    const user: User = { id: 1, username: 'User', password: 'Password', email: 'Email', notifications: [], artist: artist };
    mockArtistService.getArtist.and.returnValue(of(artist));
    mockJwtService.getMe.and.returnValue(of(user));
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue('1');

    component.ngOnInit();

    expect(mockArtistService.getArtist).toHaveBeenCalledWith(1);
    expect(mockJwtService.getMe).toHaveBeenCalled();
    expect(component.artist).toEqual(artist);
    expect(component.user).toEqual(user);
  });


  it('should handle null artistId gracefully', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);
    const user: User = { id: 1, username: 'User', password: 'Password', email: 'Email', notifications: [], artist: undefined };
    const userObservable: Observable<User> = of(user);
    mockJwtService.getMe.and.returnValue(userObservable);

    component.ngOnInit();

    expect(mockArtistService.getArtist).not.toHaveBeenCalled();
    expect(component.artist).toBeUndefined();
  });

  it('should set imageHeight and imageWidth on ngAfterViewInit', () => {
    component.uploadedImage = {
      nativeElement: {
        height: 100,
        width: 200
      }
    };

    component.ngAfterViewInit();

    expect(component.imageHeight).toBe(100);
    expect(component.imageWidth).toBe(200);
  });

  it('should handle undefined uploadedImage on ngAfterViewInit', () => {
    component.uploadedImage = undefined;

    component.ngAfterViewInit();

    expect(component.imageHeight).toBe(0);
    expect(component.imageWidth).toBe(0);
  });

  it('should call createArtist when form is valid and artist is undefined', () => {
    component.formGroup.controls.artistName.setValue('New Artist');
    component.formGroup.controls.artistDescription.setValue('Description');
    component.formGroup.controls.artistImage.setValue('Image');
    const artist:Artist = { id: 1, name: 'Artist', description: 'Description', image: 'Image' };
    const artistObservable: Observable<Artist> = of(artist);
    mockArtistService.createArtist.and.returnValue(artistObservable);

    component.saveArtist();

    expect(mockUserInformationService.setMessage).toHaveBeenCalled();
  });

  it('should not call createArtist when form is invalid', () => {
    component.formGroup.controls.artistName.setValue(null);
    component.saveArtist();

    expect(mockArtistService.createArtist).not.toHaveBeenCalled();
    expect(mockUserInformationService.setMessage).toHaveBeenCalledWith('Please fill in all fields');
  });

  //TODO BreakpointObserver is undefined
  // it('should call deleteArtist and navigate on deleteYourself', (done) => {
  //   const artist:Artist = { id: 1, name: 'Artist', description: 'Description', image: 'Image' };
  //   const artistObservable: Observable<Artist> = of(artist);
  //   mockArtistService.deleteArtist.and.returnValue(artistObservable);
  //   mockActivatedRoute.snapshot.paramMap.get.and.returnValue('1');
  //
  //   component.deleteYourself();
  //
  //   setTimeout(() => {
  //     expect(mockArtistService.deleteArtist).toHaveBeenCalledWith(1);
  //     expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  //     done();
  //   }, 4000);
  // });

  it('should handle null artistId gracefully in deleteYourself', (done) => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);

    component.deleteYourself();

    setTimeout(() => {
      expect(mockArtistService.deleteArtist).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    }, 4000);
  });

  it('should call registerArtist on updateUser', () => {
    const artist:Artist = { id: 1, name: 'Artist', description: 'Description', image: 'Image' };
    const user: User = { id: 1, username: 'User', password: 'Password', email: 'Email', notifications: [], artist: artist };
    const userObservable: Observable<User> = of(user);
    mockJwtService.registerArtist.and.returnValue(userObservable);

    component.updateUser(artist);

    expect(mockJwtService.registerArtist).toHaveBeenCalledWith(artist);
  });

  it('should not call registerArtist when artist is undefined', () => {
    const artist: Artist = { undefined} as unknown as Artist;
    component.updateUser(artist);

    expect(mockJwtService.registerArtist).not.toHaveBeenCalled();
  });
});
