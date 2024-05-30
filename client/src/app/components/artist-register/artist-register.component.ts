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
    ReactiveFormsModule
  ],
  templateUrl: './artist-register.component.html',
  styleUrl: './artist-register.component.scss'
})
export class ArtistRegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('uploadedImage')
  uploadedImage: ElementRef | undefined;
  imageHeight: number = 0
  imageWidth: number = 0
  artist: Artist | undefined;
  user: User | undefined;
  formGroup = new FormGroup({
    artistName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    artistDescription: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    artistImage: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })


  constructor(protected artistService: ArtistService, private jwtService: JwtServiceService, private route: ActivatedRoute, private router: Router) {
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
        this.artistService.createArtist(artist).subscribe(
          (a) => {
            artist.id = a.id
            this.updateUser(artist)
          }
        )
    }
  }

  updateUser(artist: Artist) {
    if (this.user) {
      this.jwtService.updateUser({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        artist: artist,
      }).subscribe(
        () => this.router.navigate(['home/artistProfile/' + artist.id])
      )
    }
  }
}


