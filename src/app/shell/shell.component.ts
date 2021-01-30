import { Title } from '@angular/platform-browser';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { I18nService } from '@app/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private i18nService: I18nService,
    public location: Location
  ) {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //   let ps = new PerfectScrollbar(elemMainPanel);
    //   ps = new PerfectScrollbar(elemSidebar);
    // }
  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  isMaps(path: string) {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1);
    return path !== title;
    // if (path === title) {
    //   return false;
    // } else {
    //   return true;
    // }
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      // const ps = new PerfectScrollbar(elemMainPanel);
      // ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
