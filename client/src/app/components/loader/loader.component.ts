import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LoaderService} from "../../services/LoaderService/loader.service";
import {AsyncPipe} from "@angular/common";
import {NeatConfig, NeatGradient} from "@firecms/neat";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {

  protected isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.isLoading = this.loaderService.getIsLoading();
  }

}
