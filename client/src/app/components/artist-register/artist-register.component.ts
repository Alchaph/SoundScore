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
import {ActivatedRoute} from "@angular/router";

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
  formGroup = new FormGroup({
    artistName: new FormControl('', Validators.required),
    artistDescription: new FormControl('', Validators.required),
    artistImage: new FormControl('', Validators.required),
  })

  artist: Artist | undefined;

  constructor(protected artistService: ArtistService, private route: ActivatedRoute) {
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
      this.artist ?
        this.artistService.updateArtist({
          id: this.artist.id,
          name: this.formGroup.controls.artistName.value ?? '',
          description: this.formGroup.controls.artistDescription.value ?? '',
          image: this.formGroup.controls.artistImage.value ?? '',
        }).subscribe() :
        this.artistService.createArtist({
          name: this.formGroup.controls.artistName.value ?? '',
          description: this.formGroup.controls.artistDescription.value ?? '',
          image: this.formGroup.controls.artistImage.value ?? '',
        }).subscribe()
    }
  }
}


