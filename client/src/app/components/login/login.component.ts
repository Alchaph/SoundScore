import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AfterViewInit, Component, OnInit} from "@angular/core";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgxMatInputTelComponent} from "ngx-mat-input-tel";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NeatConfig, NeatGradient} from "@firecms/neat";
import {NgClass} from "@angular/common";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import * as module from "node:module";
import {DataTranfer} from "../../models/DataTranfer";
import {CookieService} from "../../services/CookieService/cookie.service";

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
export class LoginComponent implements AfterViewInit, OnInit {
  protected hide: boolean = true;
  protected isRegister: boolean = false;
  protected TwoFA: boolean = false;
  protected forgotPassword: boolean = false;
  protected forgotPasswordEmail: boolean = false;
  protected newPassword: boolean = false;
  protected username: string = '';
  protected email: string = '';
  registerForm: FormGroup<{
    email: FormControl,
    otp: FormControl,
    username: FormControl,
    password: FormControl,
    repeatPassword: FormControl
  }> = new FormGroup({
    email: new FormControl('', [Validators.required]),
    otp: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  constructor(private jwtService: JwtServiceService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    localStorage.clear();
  }


  changeForm() {
    this.isRegister = !this.isRegister;
  }


  register() {
    this.jwtService.emailExists(this.registerForm.controls.email.value).subscribe( (data) => {
    if (!this.isUsernameLike(this.registerForm.controls.username.value)) {
      if (!this.registerForm.controls.username.valid) {
        alert('Username is not valid');
      } else if (!this.registerForm.controls.email.valid) {
        alert('Email is not valid');
      } else if (!this.registerForm.controls.password.valid || this.registerForm.controls.repeatPassword.value !== this.registerForm.controls.password.value) {
        alert('Passwords do not match');
        console.log(this.jwtService.emailExists(this.registerForm.controls.email.value).subscribe());
      } else if (!data) {
        this.jwtService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.username.value).subscribe(
          (data) => {
            this.login();
          });
      } else {
        alert('Email is already in use');
      }
    } else {
      alert('You cant use this Username');
    }
  });
  }

  isUsernameLike(username: string): boolean {
    return username.startsWith("An deleted User");
  }

  login() {
    if (!this.registerForm.controls.username.valid) {
      alert('Username is not valid');
    } else if (!this.registerForm.controls.password.valid) {
      alert('Password is not valid');
    } else  {
      console.log(this.registerForm.controls.username.value, this.registerForm.controls.password.value)
      this.jwtService.login(this.registerForm.controls.username.value, this.registerForm.controls.password.value).subscribe((data) => {
        if (this.cookieService.getCookie('2fa_verified') === null) {
          this.username = this.registerForm.controls.username.value;
          localStorage.setItem('token', data.token);
          this.jwtService.getEMailByUsername(this.username).subscribe((data) => {
            this.email = data.data;
            this.jwtService.authenticate(this.email).subscribe((data) => {
              this.TwoFA = true;
            });
          });
        } else {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  verifyOtp() {
    this.jwtService.verify(this.email, this.registerForm.controls.otp.value).subscribe((data) => {
      console.log(data)
      console.log(this.TwoFA)
      if (data && this.TwoFA) {
        this.router.navigate(['/home']);
      } else if (data) {
        this.forgotPassword = false;
        this.newPassword = true;
      } else {
        alert('OTP is incorrect');
      }
    });
  }

  verifyEmail() {
    this.jwtService.authenticate(this.registerForm.controls.email.value).subscribe((data) => {
      console.log(data)
      if (data) {
        console.log(this.registerForm.controls.email.value)
        this.jwtService.getUsernameByEMail(this.registerForm.controls.email.value).subscribe((data: DataTranfer) => {
          console.log("Hallo", data);
          this.email = this.registerForm.controls.email.value;
          this.forgotPasswordEmail = false
          this.forgotPassword = true;
          this.username = data.data;
        });
      } else {
        alert('Email is not registered');
      }
    });
  }

  resendOtp() {
    this.jwtService.authenticate(this.email).subscribe((data) => {
      if (data) {
        alert('OTP has been resent');
      } else {
        alert('Could not resend OTP');
      }
    });
  }

  changePassword() {
      this.jwtService.updatePassword(this.email, this.registerForm.controls.password.value).subscribe((data) => {
        if (data) {
          this.jwtService.login(this.username, this.registerForm.controls.password.value).subscribe((data) => {
            if (data) {
              localStorage.setItem('token', data.token);
              this.router.navigate(['/home']);
            } else {
              alert('Could not login');
            }
          });
        } else {
          alert('Could not update password');
        }
      });
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

  protected readonly console = module
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
    },
    {
      "color": "#0484F7",
      "enabled": false
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

