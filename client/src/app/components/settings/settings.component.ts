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
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ArtistRegisterEditComponent} from "../artist-register-edit/artist-register-edit.component";
import {Artist} from "../../models/Artist";
import {Router, RouterLink} from "@angular/router";

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
    RouterLink
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
  hide = true;

  constructor(private formBuilder: FormBuilder, private jwtService: JwtServiceService, private artistService: ArtistService, private router: Router) {
    this.userForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      artist: new FormControl<Artist | null>(null, Validators.required)
    });
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
    if (this.userForm.invalid || this.userForm.value.password !== this.userForm.value.confirmPassword) {
      console.error("Invalid form or passwords dont match");
      return;
    }
    console.log(this.userForm.value.oldPassword)
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
    this.jwtService.deleteMe().subscribe();
    this.router.navigate(['']);
    localStorage.clear();
  }

}
