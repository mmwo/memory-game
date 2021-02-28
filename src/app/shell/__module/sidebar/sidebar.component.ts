import { Component, Input, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/memory/builder', title: 'Build your set', icon: 'ui-2_settings-90', class: '' },
  { path: '/memory/play', title: 'Play', icon: 'tech_controller-modern', class: '' },
  { path: '/about', title: 'About', icon: 'education_agenda-bookmark', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  @Input() isMobileMenu: boolean;
  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
