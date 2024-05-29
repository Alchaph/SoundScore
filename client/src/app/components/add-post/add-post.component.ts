import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSelect} from "@angular/material/select";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {GenreService} from "../../services/GenreService/genre.service";
import {SongService} from "../../services/SongService/song.service";
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Genre} from "../../models/Genre";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgStyle} from "@angular/common";
import {Post} from "../../models/Post";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {PostService} from "../../services/PostService/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatOption} from "@angular/material/autocomplete";

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
export class AddPostComponent implements AfterViewInit, OnInit {
  allGenres: Genre[] = []
  allArtists: Artist[] = []
  allSongs: Song[] = []

  showedType: 'Song' | 'Artist' | 'Genre' = 'Song'
  @ViewChild('uploadedImage')
  uploadedImage: ElementRef | undefined;
  imageHeight: number = 0
  imageWidth: number = 0

  imageType: string = "Image";
  postDefaultType:string ="";
  gifSearchString: string = ""
  tenorKey: string = " AIzaSyB2mAvrM-f9yduZfFsVgysJnX5ATx1zon0"
  gifs: { id: number, title: string, media_formats: { gif: { url: string } } }[] = []
  post: Post | undefined;


  formGroup: FormGroup<{
    title: FormControl,
    content: FormControl,
    imageUrl: FormControl,
    songOrGenreOrArtist: FormControl<Song | Artist | Genre | null>
  }> = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    imageUrl: new FormControl(''),
    songOrGenreOrArtist: new FormControl<Song | Artist | Genre | null>(null, [Validators.required])
  })

  constructor(private songService: SongService,
              private genreService: GenreService,
              private artistService: ArtistService,
              private jwtService: JwtServiceService,
              private postService: PostService,
              private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute) {
    this.songService.getSongs().subscribe(data => this.allSongs = data)
    this.genreService.getGenres().subscribe(data => this.allGenres = data)
    this.artistService.getArtists().subscribe(data => this.allArtists = data)
    this.postDefaultType = this.route.snapshot.paramMap.get('postType') as string;
    this.showedType = this.postDefaultType as 'Song' | 'Artist' | 'Genre'
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.post = JSON.parse(params['post']);
      if (this.post) {
        this.formGroup.controls.title.setValue(this.post.title)
        this.formGroup.controls.content.setValue(this.post.content)
        this.formGroup.controls.imageUrl.setValue(this.post.image)
        if (this.post.song) {
          this.formGroup.controls.songOrGenreOrArtist.setValue(this.post.song as Song)
          this.showedType = 'Song'
        } else if (this.post.artist) {
          this.formGroup.controls.songOrGenreOrArtist.setValue(this.post.artist as Artist)
          this.showedType = 'Artist'
        } else if (this.post.genre) {
          this.formGroup.controls.songOrGenreOrArtist.setValue(this.post.genre as Genre)
          this.showedType = 'Genre'
        }
      }
      console.log(this.formGroup.controls.songOrGenreOrArtist.value)
    })
  }

  ngAfterViewInit() {
    if (this.uploadedImage) {
      const imgElement: HTMLImageElement = this.uploadedImage.nativeElement;
      this.imageHeight = imgElement.height
      this.imageWidth = imgElement.width
    }
  }


  searchGif(): void {
    this.http.get<{
      results: { id: number, title: string, media_formats: { gif: { url: string } } }[]
    }>(`https://tenor.googleapis.com/v2/search?q=${this.gifSearchString}&key=${this.tenorKey}&client_key=my_test_app&limit=8`).subscribe(data => {
      this.gifs = data.results
      this.formGroup.controls.imageUrl.setValue(this.gifs[0].media_formats.gif.url)
    })
  }


  savePost(): void {
    this.jwtService.getMe().subscribe(data => {
      let newPost: Post = {
        id: this.post ? this.post.id : undefined,
        title: this.formGroup.controls.title.value,
        content: this.formGroup.controls.content.value,
        image: this.formGroup.controls.imageUrl.value,
        likes: this.post ? this.post.likes : 0,
        dislikes: this.post ? this.post.dislikes : 0,
        user: this.post ? this.post.user : data,
        [this.showedType.toLowerCase()]: this.formGroup.controls.songOrGenreOrArtist.value
      }
      this.post ? this.postService.updatePost(newPost).subscribe(() => this.router.navigate(['/home/post/' + newPost.id])) : this.postService.createPost(newPost).subscribe((data) => this.router.navigate(['/home/post/' + data.id]))
    })
  }
}
