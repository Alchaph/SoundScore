import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgxMatInputTelComponent} from "ngx-mat-input-tel";
import {JwtService} from "../../services/JwtService/jwt.service";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NeatConfig, NeatGradient} from "@firecms/neat";
import {NgClass} from "@angular/common";
import {DataTranfer} from "../../models/DataTranfer";
import {CookieService} from "../../services/CookieService/cookie.service";
import {UserInformationService} from "../../services/UserInformationService/user-information.service";
import {BehaviorSubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    MatButton,
    MatIconButton,
    MatIcon,
    MatCardActions,
    MatCardTitle,
    MatLabel,
    MatHint,
    MatError,
    NgxMatInputTelComponent,
    FormsModule,
    TranslateModule,
    MatSuffix,
    NgClass

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
  protected hide: boolean = true;
  isRegister: boolean = false;
  TwoFA: boolean = false;
  TwoFA2: boolean = false;
  Otp: boolean = false;
  protected forgotPasswordEmail: boolean = false;
  protected newPassword: boolean = false;
  username: string = '';
  email: string = '';
  private token: string = '';

  registerForm: FormGroup<{
    email: FormControl,
    otp: FormControl,
    username: FormControl,
    password: FormControl,
    repeatPassword: FormControl
  }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    otp: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  constructor(private jwtService: JwtService, private router: Router, private cookieService: CookieService, private userInformationService: UserInformationService) {
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit() {
    localStorage.clear();
  }


  changeForm() {
    this.isRegister = !this.isRegister;
  }


  register() {
    this.jwtService.usernameExists(this.registerForm.controls.username.value).pipe(takeUntil(this.$destroy)).subscribe( (data) => {
      if (!data) {
        this.jwtService.emailExists(this.registerForm.controls.email.value).pipe(takeUntil(this.$destroy)).subscribe( (data) => {
          if (!this.isUsernameLike(this.registerForm.controls.username.value)) {
            if (!this.registerForm.controls.username.valid) {
              this.userInformationService.setMessage('Username is not valid');
            } else if (!this.registerForm.controls.email.valid) {
              this.userInformationService.setMessage('Email is not valid');
            } else if (!this.registerForm.controls.password.valid || this.registerForm.controls.repeatPassword.value !== this.registerForm.controls.password.value) {
              this.userInformationService.setMessage('Passwords do not match');
            } else if (!data) {
              this.jwtService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.username.value).pipe(takeUntil(this.$destroy)).subscribe(
                (data) => {
                  this.TwoFA2 = true;
                  this.login();
                });
            } else {
              this.userInformationService.setMessage('Email is already registered');
            }
          } else {
            this.userInformationService.setMessage('You cannot use this username');
          }
        });
      } else {
        this.userInformationService.setMessage('Username is already taken');
      }
    });
  }

  isUsernameLike(username: string): boolean {
    return username.startsWith("Deleted User");
  }

  login() {
    if (!this.registerForm.controls.username.valid) {
      this.userInformationService.setMessage('Username is not valid');
    } else if (!this.registerForm.controls.password.valid) {
      this.userInformationService.setMessage('Password is not valid');
    } else  {
      this.jwtService.login(this.registerForm.controls.username.value, this.registerForm.controls.password.value).pipe(takeUntil(this.$destroy)).subscribe((data) => {
        if (data && data.token) {
          const name = '2fa_verified' + this.registerForm.controls.username.value;
          if (this.cookieService.getCookie(name) === null) {
            this.username = this.registerForm.controls.username.value;
            this.token = data.token;
            this.jwtService.getEMailByUsername(this.username).pipe(takeUntil(this.$destroy)).subscribe((data) => {
              this.email = data.data;
              this.jwtService.authenticate(this.email).pipe(takeUntil(this.$destroy)).subscribe((data) => {
                this.isRegister = false;
                this.TwoFA = true;
                this.TwoFA2 = true;
              });
            });
          } else {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/home']);
          }
        } else {
          this.userInformationService.setMessage('Username or password is not correct');
        }
      }, (error) => {
        this.userInformationService.setMessage('Username or password is not correct');
      });
    }
  }

  verifyOtp() {
    this.jwtService.verify(this.email, this.username, this.registerForm.controls.otp.value).pipe(takeUntil(this.$destroy)).subscribe((data) => {
      if (data && this.TwoFA2 && this.TwoFA) {
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home']);
      } else if (data && this.TwoFA) {
        this.TwoFA = false;
        this.newPassword = true;
      } else if (this.Otp && data){
        this.jwtService.deleteAccountByUsername(this.username).pipe(takeUntil(this.$destroy)).subscribe((data) => {
          this.userInformationService.setMessage('Account could not be created');
        });
      } else {
        this.userInformationService.setMessage('OTP is not valid');
      }
    });
  }

  verifyEmail() {
    this.jwtService.authenticate(this.registerForm.controls.email.value).pipe(takeUntil(this.$destroy)).subscribe((data) => {
       if (data) {
        this.jwtService.getUsernameByEMail(this.registerForm.controls.email.value).pipe(takeUntil(this.$destroy)).subscribe((data: DataTranfer) => {
          if (data && data.data) {
            this.email = this.registerForm.controls.email.value;
            this.forgotPasswordEmail = false
            this.TwoFA = true;
            this.username = data.data;
          } else {
            this.userInformationService.setMessage('Could not find user');
          }
        });
      } else {
        this.userInformationService.setMessage('Email is not valid');
      }
    });
  }

  resendOtp() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        this.jwtService.authenticate(this.email).pipe(takeUntil(this.$destroy)).subscribe((data) => {
          if (data) {
            this.userInformationService.setMessage('OTP was resent');
          } else {
            this.userInformationService.setMessage('Could not resend OTP');
          }
        });
      }
    });
  }

  changePassword() {
    if (this.registerForm.controls.password.value === this.registerForm.controls.repeatPassword.value) {
      this.jwtService.updatePassword(this.email, this.registerForm.controls.password.value).pipe(takeUntil(this.$destroy)).subscribe((data) => {
        if (data && data.id) {
          this.jwtService.login(this.username, this.registerForm.controls.password.value).pipe(takeUntil(this.$destroy)).subscribe((data) => {
            if (data) {
              localStorage.setItem('token', data.token);
              this.router.navigate(['/home']);
            } else {
              this.userInformationService.setMessage('Could not login');
            }
          });
        } else {
          this.userInformationService.setMessage('Could not update password');
        }
      });
    } else {
      this.userInformationService.setMessage('Passwords do not match');
    }
  }

  ngAfterViewInit() {
    const bg: HTMLCanvasElement = document.getElementById("bg") as HTMLCanvasElement;
    if (bg) {
      const neat: NeatGradient = new NeatGradient({
        ref: bg,
        ...config
      });
    }
  }
}

export const config: NeatConfig = {
  "colors": [
    {
      "color": "#8F00FF",
      "enabled": true
    },
    {
      "color": "#BC00FF",
      "enabled": true
    },
    {
      "color": "#A100FF",
      "enabled": true
    },
    {
      "color": "#C500FF",
      "enabled": true
    }
  ],
  "speed": 3,
  "horizontalPressure": 2,
  "verticalPressure": 5,
  "waveFrequencyX": 4,
  "waveFrequencyY": 7,
  "waveAmplitude": 6,
  "shadows": 5,
  "highlights": 3,
  "colorBrightness": 1.05,
  "colorSaturation": -2,
  "wireframe": false,
  "colorBlending": 5,
  "backgroundColor": "#AA00FF",
  "backgroundAlpha": 1,
  "resolution": 0.8
}

