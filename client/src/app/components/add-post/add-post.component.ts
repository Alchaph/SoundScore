import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {GenreService} from "../../services/GenreService/genre.service";
import {SongService} from "../../services/SongService/song.service";
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Genre} from "../../models/Genre";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgStyle} from "@angular/common";
import {Post} from "../../models/Post";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {PostService} from "../../services/PostService/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCardHeader,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardImage,
    NgStyle
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements AfterViewInit {
  allGenres: Genre[] = []
  allArtists: Artist[] = []
  allSongs: Song[] = []
  showedType: 'Song' | 'Artist' | 'Genre' = 'Song'
  @ViewChild('uploadedImage')
  uploadedImage: ElementRef | undefined;
  imageHeight: number = 0
  imageWidth: number = 0
  formGroup: FormGroup<{
    title: FormControl,
    content: FormControl,
    imageUrl: FormControl,
    songOrGenreOrArtist: FormControl<Song | Artist | Genre | null>
  }> = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    imageUrl: new FormControl(''),
    songOrGenreOrArtist: new FormControl<Song | Artist | Genre | null>(null)
  })

  constructor(private songService: SongService,
              private genreService: GenreService,
              private artistService: ArtistService,
              private jwtService: JwtServiceService,
              private postService: PostService,
              private router: Router) {
    this.songService.getSongs().subscribe(data => this.allSongs = data)
    this.genreService.getGenres().subscribe(data => this.allGenres = data)
    this.artistService.getArtists().subscribe(data => this.allArtists = data)
  }

  ngAfterViewInit() {
    if (this.uploadedImage) {
      const imgElement: HTMLImageElement = this.uploadedImage.nativeElement;
      this.imageHeight = imgElement.height
      this.imageWidth = imgElement.width
      console.log(this.imageHeight, this.imageWidth)
    }
  }

  createPost(): void {
    this.jwtService.getMe().subscribe(data => {
      let newPost: Post = {
        title: this.formGroup.controls.title.value,
        content: this.formGroup.controls.content.value,
        image: this.formGroup.controls.imageUrl.value,
        likes: 0,
        dislikes: 0,
        user: data,
        [this.showedType.toLowerCase()]: this.formGroup.controls.songOrGenreOrArtist.value
      }
      this.postService.createPost(newPost).subscribe((data) => this.router.navigate(['/home/post/' + data.id]))
    })
  }

  protected readonly innerHeight = innerHeight;
}
