import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {HomeService} from "../../../services/HomeService/home.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TranslateModule} from "@ngx-translate/core";
import {Post} from "../../../models/Post";

@Component({
  selector: 'app-home-mobile',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFabButton,
    MatIcon,
    MatList,
    MatListItem,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    TranslateModule
  ],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss'
})
export class HomeMobileComponent implements OnInit {
  protected isMobile: boolean = false;
  protected selectedFilters?: 'genre' | 'song' | 'artist';

  constructor(protected homeService: HomeService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  selected(selected: string) {
    this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    event.stopPropagation();
    window.open(link, '_blank');
  }
}
