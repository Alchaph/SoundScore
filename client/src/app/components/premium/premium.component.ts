import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [
    TranslateModule,
    MatButton,
    RouterLink,
    HeadNavBarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './premium.component.html',
  styleUrl: './premium.component.scss'
})
export class PremiumComponent {

  protected readonly TranslateModule = TranslateModule;
  payGroup: FormGroup<{
    fullName: FormControl,
    cardNumber: FormControl;
    expiryDate: FormControl;
    cvv: FormControl;
  }> = new FormGroup({
    fullName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
    expiryDate: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3,4}$')])
  });

  constructor(protected userInformationService: UserInformationService) {
  }

  pay() {

  }
}
