import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AfterViewInit, Component} from "@angular/core";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgxMatInputTelComponent} from "ngx-mat-input-tel";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Router} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NeatConfig, NeatGradient} from "@firecms/neat";
import {LanguageService} from "../../services/languageService/language.service";
import {NgClass} from "@angular/common";

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
export class LoginComponent implements AfterViewInit{
  hide = true;
  isRegister = false;
  registerForm: FormGroup<{
    username: FormControl,
    email: FormControl,
    password: FormControl,
    repeatPassword: FormControl
  }> = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  constructor(private jwtService: JwtServiceService, private router: Router) {
  }


  changeForm() {
    this.isRegister = !this.isRegister;
    // console.log("isRegister: "+this.isRegister)
  }


  register() {
    // console.log("register called")
    if (this.registerForm.controls.password.valid && this.registerForm.controls.repeatPassword.value == this.registerForm.controls.password.value && this.registerForm.controls.username.valid && this.registerForm.controls.email.valid) {
      // console.log("if statements valid")
      this.jwtService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.username.value).subscribe(
        (data) => {
          this.login();
          // console.log("login called")
        }, error => {
          alert('The email is already in use')
        });
    }
  }

  login() {
    if (this.registerForm.controls.password.valid && this.registerForm.controls.email.valid) {
      this.jwtService.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe((data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      });
    }
  }

  ngAfterViewInit()
  {
    const bg = document.getElementById("bg") as HTMLCanvasElement;
    if (bg) {
      const neat = new NeatGradient({
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

