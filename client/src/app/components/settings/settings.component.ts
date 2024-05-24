import { Component, OnInit } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {ArtistService} from "../../services/ArtistService/artist.service";
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MatHint} from "@angular/material/form-field";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import { Router } from '@angular/router';

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
    MatSuffix
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder, private jwtService: JwtServiceService, private artistService: ArtistService, private router: Router) {
    this.userForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      artistName: [''],
      artistGenre: ['']
    });
  }

  ngOnInit(): void {
    this.jwtService.getMe().subscribe((user: User) => {
      this.userForm.patchValue({
        email: user.email,
        artistName: user.artist?.name ?? "",
        artistGenre: user.artist?.description ?? ""
      });
    });
  }
  onUserSettingsSubmit(): void {
    if (this.userForm.invalid || this.userForm.value.password !== this.userForm.value.confirmPassword) {
      return;
    }
    this.jwtService.verifyPassword(this.userForm.value.email, this.userForm.value.password).subscribe(() => {
      this.jwtService.getMe().subscribe((user: User) => {
        user.email = this.userForm.value.email;
        user.password = this.userForm.value.password;
        this.jwtService.updateUser(user).subscribe();
      });
    });
  }

  deleteUser(): void {
    this.jwtService.deleteUser().subscribe();
    this.router.navigate(['']);
    localStorage.clear();
  }

}
