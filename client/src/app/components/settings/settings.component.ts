import { Component, OnInit } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {ArtistService} from "../../services/ArtistService/artist.service";
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private jwtService: JwtServiceService, private artistService: ArtistService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      artistName: [''],
      artistGenre: ['']
    });
  }

  ngOnInit(): void {
    this.jwtService.getMe().subscribe((user: User) => {
      this.userForm.patchValue({
        username: user.username,
        password: user.password,
        email: user.email,
        artistName: user.artist?.name ?? "",
        artistGenre: user.artist?.description ?? ""
      });
    });
  }
  onSubmit(): void {

  }

}
