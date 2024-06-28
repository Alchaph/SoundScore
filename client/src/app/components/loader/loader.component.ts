import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscriber, TeardownLogic} from "rxjs";
import {LoaderService} from "../../services/LoaderService/loader.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{

  isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(private loaderService: LoaderService) {
  }

    ngOnInit() {
      this.isLoading = this.loaderService.getIsLoading();
    }
}
