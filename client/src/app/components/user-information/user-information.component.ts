import {Component, OnInit} from '@angular/core';
import {UserInformationService} from "../../services/UserInformationService/user-information.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {

  isMessage = this.userInformationService.getIsMessage();

  message = this.userInformationService.getMessage();

  constructor(private userInformationService: UserInformationService) {
  }

  hide() {
    this.userInformationService.hide();
  }

}
