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
import {AsyncPipe, Location, NgStyle} from "@angular/common";
import {Post} from "../../models/Post";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {PostService} from "../../services/PostService/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatOption} from "@angular/material/autocomplete";
import {GifService} from "../../services/GifService/gif.service";
import {TranslateModule} from "@ngx-translate/core";

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
    NgStyle,
    TranslateModule
  ],
  templateUrl: './add-edit-post-component.html',
  styleUrl: './add-edit-post-component.scss'
})
export class AddEditPostComponent implements AfterViewInit, OnInit {
  protected allGenres: Genre[] = [];
  protected allArtists: Artist[] = [];
  protected allSongs: Song[] = [];

  showedType: 'Song' | 'Artist' | 'Genre' = 'Song';
  @ViewChild('uploadedImage') uploadedImage: ElementRef | undefined;
  imageHeight: number = 0;
  imageWidth: number = 0;

  protected imageType: string = "Image";
  protected postDefaultType: string = "";
  gifSearchString: string = "";
  gifSearchResults: string[] = [];
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
  });


  constructor(private songService: SongService,
              private genreService: GenreService,
              private artistService: ArtistService,
              private jwtService: JwtServiceService,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private gifService: GifService) {
    this.songService.getSongs().subscribe(data => this.allSongs = data)
    this.genreService.getGenres().subscribe(data => this.allGenres = data)
    this.artistService.getArtists().subscribe(data => this.allArtists = data)
    this.postDefaultType = this.route.snapshot.paramMap.get('postType') as string;
    this.showedType = this.postDefaultType as 'Song' | 'Artist' | 'Genre'
  }


  ngOnInit(): void {
    this.postService.getPost(Number(this.route.snapshot.paramMap.get('postId'))).subscribe(params => {
      this.post = params;
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
    })
  }

  ngAfterViewInit(): void {
    if (this.uploadedImage) {
      this.imageHeight = this.uploadedImage.nativeElement.height;
      this.imageWidth = this.uploadedImage.nativeElement.width;
    } else {
      this.imageHeight = 0;
      this.imageWidth = 0;
    }
  }

  // ngAfterViewInit() {
  //   if (this.uploadedImage) {
  //     const imgElement: HTMLImageElement = this.uploadedImage.nativeElement;
  //     this.imageHeight = imgElement.height
  //     this.imageWidth = imgElement.width
  //   }
  // }
  goBack() {
    this.location.back();
  }

  searchGif(): void {
    this.gifService.searchGif(this.gifSearchString).subscribe(data => {
      this.gifSearchResults = data.results.map(result => result.media_formats.gif.url)
      this.formGroup.controls.imageUrl.setValue(data.results[0].media_formats.gif.url);
    });
  }


  savePost(): void {
    this.jwtService.getMe().subscribe(data => {
      let newPost: Post = {
        id: this.post ? this.post.id : undefined,
        title: this.formGroup.controls.title.value,
        content: this.formGroup.controls.content.value,
        image: this.formGroup.controls.imageUrl.value,
        likes: this.post ? this.post.likes : [],
        dislikes: this.post ? this.post.dislikes : [],
        user: this.post ? this.post.user : data,
        [this.showedType.toLowerCase()]: this.formGroup.controls.songOrGenreOrArtist.value
      }
      this.post ? this.postService.updatePost(newPost).subscribe(() => this.router.navigate(['/home/post/' + newPost.id])) : this.postService.createPost(newPost).subscribe((data) => this.router.navigate(['/home/post/' + data.id]))
    })
  }

  selectGif(gifString: string) {
    this.formGroup.controls.imageUrl.setValue(gifString)
  }
}
