import { Component } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadNavBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
