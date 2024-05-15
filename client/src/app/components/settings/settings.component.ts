import { Component } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {ArtistServiceService} from "../../services/ArtistService/artist-service.service";
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private jwtService: JwtServiceService, private artistService: ArtistServiceService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      artistName: [''],
      artistGenre: ['']
    });
  }

  onSubmit(): void {}
}
