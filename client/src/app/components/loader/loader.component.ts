import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscriber, TeardownLogic} from "rxjs";
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
export class LoaderComponent implements OnInit, AfterViewInit{

  isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(private loaderService: LoaderService) {
  }

    ngOnInit() {
      this.isLoading = this.loaderService.getIsLoading();
    }

  ngAfterViewInit()
  {
    const bg: HTMLCanvasElement = document.getElementById("bg") as HTMLCanvasElement;
    if (bg) {
      const neat:NeatGradient = new NeatGradient({
        ref: bg,
        ...config
      });
    }
  }

}
export const config: NeatConfig = {
  "colors": [
    {
      "color": "#FFFFFF",
      "enabled": true
    },
    {
      "color": "#F9EAD9",
      "enabled": true
    },
    {
      "color": "#FFF5DE",
      "enabled": true
    },
    {
      "color": "#E4E4E4",
      "enabled": true
    },
    {
      "color": "#F6FFFF",
      "enabled": true
    }
  ],
  "speed": 4,
  "horizontalPressure": 2,
  "verticalPressure": 5,
  "waveFrequencyX": 4,
  "waveFrequencyY": 6,
  "waveAmplitude": 3,
  "shadows": 7,
  "highlights": 6,
  "colorBrightness": 1,
  "colorSaturation": 1,
  "wireframe": false,
  "colorBlending": 7,
  "backgroundColor": "#0b3954",
  "backgroundAlpha": 1,
  "resolution": 1
}
