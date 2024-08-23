import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";
import {JwtService} from "../../services/JwtService/jwt.service";
import {User} from "../../models/User";
import {PayPalAccessToken} from "../../models/PayPalAccessToken";
import {BehaviorSubject, takeUntil} from "rxjs";


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
export class PremiumComponent implements OnDestroy{

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

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  creditCard: boolean = false;

  constructor(protected userInformationService: UserInformationService, private jwtService: JwtService, private router: Router) {
  }

  pay() {
    this.jwtService.updateToPremium().pipe(takeUntil(this.$destroy)).subscribe((data: User) => {
      if (data && data.id) {
        this.userInformationService.setMessage('Payment successful');
        this.router.navigate(['/home']);
      } else {
        this.userInformationService.setMessage('Something went wrong');
      }
    }, error => {
      this.userInformationService.setMessage('Something went wrong');
    });
  }

  protected readonly window = window;
}
