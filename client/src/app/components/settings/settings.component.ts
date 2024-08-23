import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {User} from "../../models/User";
import {JwtService} from '../../services/JwtService/jwt.service';
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
import {CookieService} from "../../services/CookieService/cookie.service";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";
import {BehaviorSubject, takeUntil} from "rxjs";

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
export class SettingsComponent implements OnInit, OnDestroy {
  userForm: FormGroup<{
    oldPassword: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    email: FormControl;
    username: FormControl;
  }>;
  protected artist: FormControl<Artist| null | undefined> = new FormControl<Artist | null | undefined>(null, Validators.required)
  protected hide: boolean = true;
  protected fly: boolean = false;
  protected fall: boolean = false;
  protected explode: boolean = false;
  disabled: boolean = false;
  protected email: string = '';
  protected username: string = '';
  protected notOnlyPassword: boolean = true;

  constructor(private jwtService: JwtService, private router: Router, private cookieService: CookieService, private userInformationService: UserInformationService) {
    this.userForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl(['', Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      username: new FormControl('', Validators.required),
    });
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
    this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe((user: User) => {
      if (user) {
        this.userForm.patchValue({
          email: user.email,
          username: user.username,
        });
        this.artist.setValue(user.artist)
        this.email = user.email;
        this.username = user.username;
      }
    });
  }

  onUserSettingsSubmit(): void {
    if (this.userForm.controls.password.value === '' && this.userForm.controls.confirmPassword.value === '') {
      this.userForm.controls.password.setValue(this.userForm.controls.oldPassword.value);
      this.userForm.controls.confirmPassword.setValue(this.userForm.controls.oldPassword.value);
      this.notOnlyPassword = false;
    }
    if (this.userForm.invalid) {
      this.userInformationService.setMessage('Please fill in all fields');
      return;
    } else if (this.userForm.value.password === this.userForm.value.oldPassword && this.notOnlyPassword) {
      this.userInformationService.setMessage('New password must be different from old password');
      return;
    } else if(this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.userInformationService.setMessage('Passwords do not match');
      return;
    }
    this.jwtService.verifyPassword(this.username, this.userForm.value.oldPassword).pipe(takeUntil(this.$destroy)).subscribe((response) => {
      if (response === false) {
        this.userInformationService.setMessage('Old password is incorrect');
        return;
      }
      this.jwtService.authenticate(this.userForm.value.email).pipe(takeUntil(this.$destroy)).subscribe((data) => {
        if (data) {
          this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe((user: User) => {
            user.email = this.userForm.value.email;
            user.username = this.userForm.value.username;
            user.password = this.userForm.value.password;
            this.jwtService.updateUser(user).pipe(takeUntil(this.$destroy)).subscribe((data) =>
            {
              localStorage.clear();
              this.jwtService.login(this.userForm.controls.username.value, this.userForm.controls.password.value).pipe(takeUntil(this.$destroy)).subscribe((response) => {
                localStorage.setItem('token', response.token);
                this.userForm.controls.oldPassword.setValue('');
                this.userForm.controls.password.setValue('');
                this.userForm.controls.confirmPassword.setValue('');
                this.router.navigate(['/home']);
              });
              this.username = user.username;
              this.email = user.email;
            });
          });
        } else {
          this.userInformationService.setMessage('Email is already registered');
        }
      }, (error) => {
        this.userInformationService.setMessage('Email is not valid');
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
            this.jwtService.deleteMe().pipe(takeUntil(this.$destroy)).subscribe((data) => {
              this.cookieService.deleteCookie('2fa_verified' + data.username);
              this.router.navigate(['']);
              localStorage.clear();
            });
          }, 500);
        }, 2000);
      }, 3000);
    }
  }

}
