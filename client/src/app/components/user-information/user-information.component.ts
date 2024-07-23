import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class UserInformationComponent implements OnInit, OnDestroy {

  isMessage = this.userInformationService.getIsMessage();

  message = this.userInformationService.getMessage();

  constructor(private userInformationService: UserInformationService) {

  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.hideOnEvent.bind(this));
    window.addEventListener('click', this.hideOnEvent.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.hideOnEvent.bind(this));
    window.removeEventListener('click', this.hideOnEvent.bind(this));
  }

  hideOnEvent(): void {
    this.userInformationService.hide();
  }

  hide() {
    this.userInformationService.hide();
  }

}
