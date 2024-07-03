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
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgClass, NgIf} from "@angular/common";

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
  fly: boolean = false;
  fall: boolean = false;
  explode: boolean = false;
  disabled: boolean = false;

  constructor(protected artistService: ArtistService, private jwtService: JwtServiceService, protected route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
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
          () => this.updateUser(artist)
        ) :
        console.log(this.user)
      this.artistService.createArtist(artist).subscribe(
        (a) => {
          artist.id = a.id
          this.updateUser(artist)
        }
      )
    }
    alert('Please fill out all fields')
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
    if (artist) {
      this.jwtService.updateUser({
        id: artist?.id,
        name: artist?.name!,
        description: artist?.description!,
        image: artist?.image!,
      }).subscribe(
        () => {
          this.router.navigate(['home/artistProfile/' + artist.id])

        }
      )
    }
  }
}


