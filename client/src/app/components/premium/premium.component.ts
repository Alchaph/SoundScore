import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [
    TranslateModule,
    MatButton,
    RouterLink,
    HeadNavBarComponent
  ],
  templateUrl: './premium.component.html',
  styleUrl: './premium.component.scss'
})
export class PremiumComponent {

  protected readonly TranslateModule = TranslateModule;
}
