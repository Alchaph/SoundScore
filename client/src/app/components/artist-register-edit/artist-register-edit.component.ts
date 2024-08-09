import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButton} from "@angular/material/button";
import {MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {Artist} from "../../models/Artist";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";
import {JwtService} from "../../services/JwtService/jwt.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgClass, NgIf} from "@angular/common";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";

@Component({
  selector: 'app-artist-register',
  standalone: true,
  imports: [
    FormsModule,
    HeadNavBarComponent,
    MatButton,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    TranslateModule,
    MatTabGroup,
    MatTab,
    NgClass,
    NgIf
  ],
  templateUrl: './artist-register-edit.component.html',
  styleUrl: './artist-register-edit.component.scss'
})
export class ArtistRegisterEditComponent implements OnInit, AfterViewInit {
  @ViewChild('uploadedImage')
  uploadedImage: ElementRef | undefined;
  imageHeight: number = 0
  imageWidth: number = 0
  artist: Artist | undefined;
  user: User | undefined;
  formGroup: FormGroup<{
    artistName: FormControl<string | null>,
    artistDescription: FormControl<string | null>,
    artistImage: FormControl<string | null>
  }>
    = new FormGroup({
    artistName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    artistDescription: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    artistImage: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })
  protected fly: boolean = false;
  protected fall: boolean = false;
  protected explode: boolean = false;
  protected disabled: boolean = false;

  constructor(protected artistService: ArtistService, private jwtService: JwtService, protected route: ActivatedRoute, private router: Router, private userInformationService: UserInformationService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('artistId'))
    this.artistService.getArtist(parseInt(this.route.snapshot.paramMap.get('artistId') ?? '0')).subscribe((a: Artist) => {
      this.artist = a;
      if (this.artist) {
        this.formGroup.controls.artistName.setValue(this.artist.name)
        this.formGroup.controls.artistDescription.setValue(this.artist.description)
        this.formGroup.controls.artistImage.setValue(this.artist.image)
      }
    })
    this.jwtService.getMe().subscribe((u: User) => {
      this.user = u;
    })
  }

  ngAfterViewInit() {
    if (this.uploadedImage) {
      const imgElement: HTMLImageElement = this.uploadedImage.nativeElement;
      this.imageHeight = imgElement.height
      this.imageWidth = imgElement.width
    }
  }


  saveArtist() {
    if (this.formGroup.valid) {
      let artist: Artist = {
        name: this.formGroup.controls.artistName.value ?? '',
        description: this.formGroup.controls.artistDescription.value ?? '',
        image: this.formGroup.controls.artistImage.value ?? '',
      }
      this.artist ? artist.id = this.artist.id : null
      this.artist ?
        this.artistService.updateArtist(artist).subscribe(
          () => {this.updateUser(artist)
        this.router.navigate(['home/userProfile/' + this.user?.id + '/1'])
          }
    ) :
        this.artistService.createArtist(artist).subscribe(
          (a) => {
            this.router.navigate(['home/userProfile/' + this.user?.id + '/1'])
          }
        )
    } else {
      this.userInformationService.setMessage('Please fill in all fields')
    }
  }

  deleteYourself() {
    this.disabled = true;
    const planeContainer: HTMLElement | null = document.getElementById('planeContainer');
    const plane: HTMLElement | null = document.getElementById('plane');
    const nuke: HTMLElement | null = document.getElementById('nuke');
    const nukeScreen: HTMLElement | null = document.getElementById('nukeScreen');
    if (planeContainer && plane && nuke && nukeScreen) {
      let audio: HTMLAudioElement = new Audio('assets/sounds/plane.mp3');
      audio.play();
      planeContainer.style.display = 'block';
      this.fly = true;
      setTimeout(() => {
        let audio2: HTMLAudioElement = new Audio('assets/sounds/explosion.mp3');
        audio2.currentTime = 0.4;
        audio2.play();
        nuke.style.visibility = 'visible';
        this.fall = true;
        setTimeout(() => {
          let audio3: HTMLAudioElement = new Audio('assets/sounds/hexplosion.mp3');
          audio3.currentTime = 0.45;
          audio3.play();
          audio.pause();
          nukeScreen.style.display = 'block';
          nuke.style.visibility = 'hidden';
          this.explode = true;
          setTimeout(() => {
            this.artistService.deleteArtist(parseInt(this.route.snapshot.paramMap.get('artistId') ?? '0')).subscribe();
            this.router.navigate(['/home']);
          }, 500);
        }, 2000);
      }, 3000);
    }
  }

  updateUser(artist: Artist) {
    if (artist && artist.id) {
      this.jwtService.registerArtist({
        id: artist?.id,
        name: artist?.name!,
        description: artist?.description!,
        image: artist?.image!,
      }).subscribe(
        () => {

        }
      )
    }
  }
}


