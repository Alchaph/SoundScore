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
import {Subject, takeUntil} from "rxjs";

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
    email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    otp: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl(''),
  });

  constructor(private jwtService: JwtService, private router: Router, private cookieService: CookieService, private userInformationService: UserInformationService) {
  }

  $destroy: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  ngOnInit() {
    localStorage.clear();
  }


  onSubmit() {
    console.log('[Login] ngSubmit fired — isRegister:', this.isRegister, 'form valid:', this.registerForm.valid);
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  changeForm() {
    this.isRegister = !this.isRegister;
    console.log('[Login] changeForm -> isRegister:', this.isRegister);
    if (this.isRegister) {
      this.registerForm.controls.email.addValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]);
      this.registerForm.controls.repeatPassword.addValidators([Validators.required]);
    } else {
      this.registerForm.controls.email.clearValidators();
      this.registerForm.controls.repeatPassword.clearValidators();
    }
    this.registerForm.controls.email.updateValueAndValidity();
    this.registerForm.controls.repeatPassword.updateValueAndValidity();
  }


  register() {
    const username = this.registerForm.controls.username.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    console.log('[Login] register() called — username:', username, 'email:', email, 'form valid:', this.registerForm.valid);
    console.log('[Login] field status:', {
      username: { value: username, valid: this.registerForm.controls.username.valid, errors: this.registerForm.controls.username.errors },
      email: { value: email, valid: this.registerForm.controls.email.valid, errors: this.registerForm.controls.email.errors },
      password: { value: password ? '***' : '', valid: this.registerForm.controls.password.valid, errors: this.registerForm.controls.password.errors },
      repeatPassword: { value: this.registerForm.controls.repeatPassword.value ? '***' : '', valid: this.registerForm.controls.repeatPassword.valid, errors: this.registerForm.controls.repeatPassword.errors },
      otp: { valid: this.registerForm.controls.otp.valid, errors: this.registerForm.controls.otp.errors },
    });

    this.jwtService.usernameExists(username).pipe(takeUntil(this.$destroy)).subscribe({
      next: (usernameExists) => {
        console.log('[Login] usernameExists response:', usernameExists);
        if (!usernameExists) {
          this.jwtService.emailExists(email).pipe(takeUntil(this.$destroy)).subscribe({
            next: (emailExists) => {
              console.log('[Login] emailExists response:', emailExists);
              if (!this.isUsernameLike(username)) {
                if (!this.registerForm.controls.username.valid) {
                  console.log('[Login] username invalid');
                  this.userInformationService.setMessage('Username is not valid');
                } else if (!this.registerForm.controls.email.valid) {
                  console.log('[Login] email invalid');
                  this.userInformationService.setMessage('Email is not valid');
                } else if (!this.registerForm.controls.password.valid || this.registerForm.controls.repeatPassword.value !== password) {
                  console.log('[Login] passwords mismatch');
                  this.userInformationService.setMessage('Passwords do not match');
                } else if (!emailExists) {
                  console.log('[Login] calling jwtService.register()...');
                  this.jwtService.register(email, password, username).pipe(takeUntil(this.$destroy)).subscribe({
                    next: (data) => {
                      console.log('[Login] register success:', data);
                      this.TwoFA2 = true;
                      this.login();
                    },
                    error: (err) => {
                      console.error('[Login] register HTTP error:', err);
                      this.userInformationService.setMessage('Registration failed: ' + (err.message || 'Unknown error'));
                    }
                  });
                } else {
                  console.log('[Login] email already registered');
                  this.userInformationService.setMessage('Email is already registered');
                }
              } else {
                console.log('[Login] username starts with "Deleted User"');
                this.userInformationService.setMessage('You cannot use this username');
              }
            },
            error: (err) => {
              console.error('[Login] emailExists HTTP error:', err);
              this.userInformationService.setMessage('Error checking email: ' + (err.message || 'Unknown error'));
            }
          });
        } else {
          console.log('[Login] username already taken');
          this.userInformationService.setMessage('Username is already taken');
        }
      },
      error: (err) => {
        console.error('[Login] usernameExists HTTP error:', err);
        this.userInformationService.setMessage('Error checking username: ' + (err.message || 'Unknown error'));
      }
    });
  }

  isUsernameLike(username: string): boolean {
    return username.startsWith("Deleted User");
  }

  login() {
    const username = this.registerForm.controls.username.value;
    const password = this.registerForm.controls.password.value;
    console.log('[Login] login() called — username:', username, 'form valid:', this.registerForm.valid);

    if (!this.registerForm.controls.username.valid) {
      console.log('[Login] username invalid');
      this.userInformationService.setMessage('Username is not valid');
    } else if (!this.registerForm.controls.password.valid) {
      console.log('[Login] password invalid');
      this.userInformationService.setMessage('Password is not valid');
    } else  {
      console.log('[Login] calling jwtService.login()...');
      this.jwtService.login(username, password).pipe(takeUntil(this.$destroy)).subscribe({
        next: (data) => {
          console.log('[Login] login response:', data);
          if (data && data.token) {
            // 2FA disabled for local dev
            console.log('[Login] 2FA bypassed, navigating to /home');
            localStorage.setItem('token', data.token);
            this.router.navigate(['/home']);
          } else {
            console.log('[Login] no token in response');
            this.userInformationService.setMessage('Username or password is not correct');
          }
        },
        error: (error) => {
          console.error('[Login] login HTTP error:', error);
          this.userInformationService.setMessage('Username or password is not correct');
        }
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

