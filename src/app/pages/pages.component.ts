import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../@core/mock/menu.service';
import { NbMenuService } from '@nebular/theme';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import { takeWhile } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu tag="menu" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {

  public menu: any = [];
  private alive: boolean = true;
  selectedItem: string;

  constructor(
    private route: Router,
    private location: Location,
    private menuService: MenuService,
    private nbMenuService: NbMenuService,
    private nbMenuInternalService: NbMenuInternalService
  ) {

    this.menuService.getItems().subscribe((menu: any) => {
      this.menu = menu;
    });
  }

  ngOnInit() {
    this.nbMenuService.onSubmenuToggle()
    .pipe(takeWhile(() => this.alive))
    .subscribe((subMenu) => {
      if (_.get(subMenu.item, 'link') && subMenu.item.link.length > 0) {
        this.nbMenuInternalService.itemSelect(subMenu.item, 'menu');
        this.route.navigate([subMenu.item.link]);
      }
      this.nbMenuInternalService.itemSelect(subMenu.item, 'menu');
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
