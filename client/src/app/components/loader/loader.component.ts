import {AfterViewInit, Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {LoaderService} from "../../services/LoaderService/loader.service";
import {AsyncPipe} from "@angular/common";
import {NeatConfig, NeatGradient} from "@firecms/neat";

@Component({
    selector: 'app-loader',
    imports: [
        AsyncPipe
    ],
    templateUrl: './loader.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {

  isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.isLoading = this.loaderService.getIsLoading();
  }

}
