import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {User} from "../../models/User";
import {ArtistService} from "../../services/ArtistService/artist.service";
import {JwtServiceService} from '../../services/JwtService/jwt-service.service';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ArtistRegisterEditComponent} from "../artist-register-edit/artist-register-edit.component";
import {Artist} from "../../models/Artist";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    ReactiveFormsModule,
    MatIcon,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatHint,
    MatTabGroup,
    MatTab,
    MatIconModule,
    MatSuffix,
    ArtistRegisterEditComponent,
    RouterLink,
    NgClass,
    TranslateModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup<{
    oldPassword: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    email: FormControl;
    artist: FormControl<Artist | null>;
  }>;
  hide: boolean = true;
  fly: boolean = false;
  fall: boolean = false;
  explode: boolean = false;
  disabled: boolean = false;

  private audioContext: AudioContext;

  constructor(private jwtService: JwtServiceService, private artistService: ArtistService, private router: Router) {
    this.userForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      artist: new FormControl<Artist | null>(null, Validators.required)
    });
    this.audioContext = new (window.AudioContext)();
  }

  ngOnInit(): void {
    this.jwtService.getMe().subscribe((user: User) => {
      this.userForm.patchValue({
        email: user.email,
        artist: user.artist
      });
    });
  }

  onUserSettingsSubmit(): void {
    if (this.userForm.invalid) {
      alert('Please fill out all fields')
      return;
    } else if (this.userForm.value.password === this.userForm.value.oldPassword) {
      alert('New password cannot be the same as the old password');
      return;
    } else if(this.userForm.value.password !== this.userForm.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.jwtService.verifyPassword(this.userForm.value.email, this.userForm.value.oldPassword).subscribe((response) => {
      console.log(response)
      if (response === false) {
        console.error("old Password is incorrect");
        return;
      }
      this.jwtService.getMe().subscribe((user: User) => {
        user.email = this.userForm.value.email;
        user.password = this.userForm.value.password;
        this.jwtService.updateUsers(user).subscribe();
      });
    });
  }

  deleteYourself(): void {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        console.log('Audio context resumed');
      });
    }
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
          let audio3:HTMLAudioElement = new Audio('assets/sounds/hexplosion.mp3');
          audio3.currentTime = 0.45;
          audio3.play();
          audio.pause();
          nukeScreen.style.display = 'block';
          nuke.style.visibility = 'hidden';
          this.explode = true;
          setTimeout(() => {
            this.jwtService.deleteMe().subscribe();
            this.router.navigate(['']);
            localStorage.clear();
          }, 500);
        }, 2000);
      }, 3000);
    }
  }

}
