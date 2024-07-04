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
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    userName: FormControl;
  }>;
  artist: FormControl<Artist| null | undefined> = new FormControl<Artist | null | undefined>(null, Validators.required)
  hide: boolean = true;
  fly: boolean = false;
  fall: boolean = false;
  explode: boolean = false;
  disabled: boolean = false;

  email: string = '';
  userName: string = '';

  notOnlyPassword: boolean = true;

  private audioContext: AudioContext;

  constructor(private jwtService: JwtServiceService, private router: Router) {
    this.userForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
    });
    this.audioContext = new (window.AudioContext)();
  }

  ngOnInit(): void {
    this.jwtService.getMe().subscribe((user: User) => {
      this.userForm.patchValue({
        email: user.email,
        userName: user.username,
      });
      this.artist.setValue(user.artist)
      this.email = user.email;
      this.userName = user.username;
    });
  }

  onUserSettingsSubmit(): void {
    if (this.userForm.controls.password.value === '' && this.userForm.controls.confirmPassword.value === '') {
      this.userForm.controls.password.setValue(this.userForm.controls.oldPassword.value);
      this.userForm.controls.confirmPassword.setValue(this.userForm.controls.oldPassword.value);
      this.notOnlyPassword = false;
    }
    if (this.userForm.invalid) {
      alert('Please fill out all fields')
      return;
    } else if (this.userForm.value.password === this.userForm.value.oldPassword && this.notOnlyPassword) {
      alert('New password cannot be the same as the old password');
      return;
    } else if(this.userForm.value.password !== this.userForm.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.jwtService.verifyPassword(this.userName, this.userForm.value.oldPassword).subscribe((response) => {
      console.log(response)
      if (response === false) {
        alert("old Password is incorrect");
        return;
      }
      this.jwtService.getMe().subscribe((user: User) => {
        user.email = this.userForm.value.email;
        user.username = this.userForm.value.userName;
        user.password = this.userForm.value.password;
        this.jwtService.updateUsers(user).subscribe((data) =>
        {
          localStorage.clear();
          this.jwtService.login(this.userForm.controls.userName.value, this.userForm.controls.password.value).subscribe((response) => {
            localStorage.setItem('token', response.token);
            this.userForm.controls.oldPassword.setValue('');
            this.userForm.controls.password.setValue('');
            this.userForm.controls.confirmPassword.setValue('');
            this.router.navigate(['/home']);
          });
          this.userName = user.username;
          this.email = user.email;
        });
      });
    });
  }

  deleteYourself(): void {
    this.disabled = true;
    const planeContainer: HTMLElement | null = document.getElementById('planeContainer');
    const plane: HTMLElement | null = document.getElementById('plane');
    const nuke: HTMLElement | null = document.getElementById('nuke');
    const nukeScreen: HTMLElement | null = document.getElementById('nukeScreen');
    if (planeContainer && plane && nuke && nukeScreen) {
      let audio: HTMLAudioElement = new Audio('assets/sounds/plane.mp3');
      this.unmuteAudio(audio);
      audio.play();
      planeContainer.style.display = 'block';
      this.fly = true;
      setTimeout(() => {
        let audio2: HTMLAudioElement = new Audio('assets/sounds/explosion.mp3');
        audio2.currentTime = 0.4;
        this.unmuteAudio(audio2)
        audio2.play();
        nuke.style.visibility = 'visible';
        this.fall = true;
        setTimeout(() => {
          let audio3:HTMLAudioElement = new Audio('assets/sounds/hexplosion.mp3');
          audio3.currentTime = 0.45;
          this.unmuteAudio(audio3)
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

  unmuteAudio(audio: HTMLAudioElement): void {
    const source = this.audioContext.createMediaElementSource(audio);
    const gainNode = this.audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.value = 1;
  }

}
