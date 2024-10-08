import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButton} from "@angular/material/button";
import {Location} from "@angular/common";
import {MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {Song} from "../../models/Song";
import {SongService} from "../../services/SongService/song.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Genre} from "../../models/Genre";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {GenreService} from "../../services/GenreService/genre.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GifService} from "../../services/GifService/gif.service";
import {User} from "../../models/User";
import {JwtService} from "../../services/JwtService/jwt.service";
import {TranslateModule} from "@ngx-translate/core";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";
import {BehaviorSubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-add-edit-song',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatButton,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    MatLabel,
    MatInput,
    MatCardImage,
    TranslateModule
  ],
  templateUrl: './add-edit-song.component.html',
  styleUrl: './add-edit-song.component.scss'
})
export class AddEditSongComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('uploadedImage')
  uploadedImage: ElementRef | undefined;
  imageHeight: number = 0
  imageWidth: number = 0
  user: User | undefined
  gifSearchResults: string[] = []
  formGroup: FormGroup<{
    title: FormControl;
    imageUrl: FormControl;
    link: FormControl;
    genre: FormControl;
  }> = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    imageUrl: new FormControl(''),
    link: new FormControl(''),
    genre: new FormControl<Genre | null>(null, [Validators.required]),
  })
  protected allGenres: Genre[] = []
  song: Song | undefined
  protected imageType: string = "Image";
  gifSearchString: string = ""

  constructor(private location: Location,
              private songService: SongService,
              private genreService: GenreService,
              private route: ActivatedRoute,
              private gifService: GifService,
              private jwtService: JwtService,
              private router: Router,
              private userInformationService: UserInformationService
  ) {
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.genreService.getGenres().pipe(takeUntil(this.$destroy)).subscribe(data => this.allGenres = data)
    this.songService.getSong(Number(this.route.snapshot.paramMap.get('songId'))).subscribe(data => {
      if (data) {
        this.song = data
        this.formGroup.controls.imageUrl.setValue(data.image)
        this.formGroup.controls.title.setValue(data.title)
        this.formGroup.controls.link.setValue(data.link)
        this.formGroup.controls.genre.setValue(data.genre)
      }
    })
    this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe(data => this.user = data)
  }

  ngAfterViewInit() {
    if (this.uploadedImage) {
      const imgElement: HTMLImageElement = this.uploadedImage.nativeElement;
      this.imageHeight = imgElement.height
      this.imageWidth = imgElement.width
    }
  }

  searchGif() {
    if (this.gifSearchString !== "") {
      this.gifService.searchGif(this.gifSearchString).pipe(takeUntil(this.$destroy)).subscribe(data => {
        if (data.results) {
          if (data.results.map(result => result.media_formats.gif.url).length > 0) {
            this.gifSearchResults = data.results.map(result => result.media_formats.gif.url)
            this.formGroup.controls.imageUrl.setValue(data.results[0].media_formats.gif.url);
          }
        }
      })
    } else {
      this.gifSearchResults = []
    }
  }

  selectGif(gifString: string) {
    this.formGroup.controls.imageUrl.setValue(gifString)
  }

  saveSong() {
    if (this.formGroup.valid && this.user?.artist) {
      const song: Song = {
        title: this.formGroup.controls.title.value,
        image: this.formGroup.controls.imageUrl.value,
        link: this.formGroup.controls.link.value,
        genre: this.formGroup.controls.genre.value as Genre,
        artist: this.user?.artist
      }
      this.songService.createEditSong(song).pipe(takeUntil(this.$destroy)).subscribe((data) => {
        this.router.navigate(['/home/userProfile/' + this.user?.id?.toString() + '/'  + '1'])
      });
    } else {
      this.userInformationService.setMessage('Please fill out all fields')
    }
  }
}
