import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Component} from "@angular/core";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgxMatInputTelComponent} from "ngx-mat-input-tel";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageService} from "../../services/languageService/language.service";

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
    TranslateModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
    repeatPassword: new FormControl('', [Validators.required, this.validator.bind(this)]),
  });

  constructor(private jwtService: JwtServiceService, private router: Router, private languageService: LanguageService) {

  }



  validator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let valid = this.registerForm.controls.password.value === this.registerForm.controls.repeatPassword.value;
      return valid ? {'forbiddenUsername': {value: this.registerForm.controls.repeatPassword.value}} : null;
    };
  }

  changeForm() {
    this.isRegister = !this.isRegister;
  }


  register() {
    if (this.registerForm.controls.password.valid && this.registerForm.controls.repeatPassword && this.registerForm.controls.username.valid && this.registerForm.controls.email.valid) {
      this.jwtService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.username.value).subscribe(
        () => {
          this.login();
        }, () => {
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
}
