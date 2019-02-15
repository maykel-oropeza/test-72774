import { Component, TemplateRef, Input, OnInit, ViewChild } from '@angular/core';

import { NbMenuService, NbSidebarService, NbDialogService, NbSearchService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { SearchService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { ShoppingCartService } from '../../../services';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

import * as _ from 'lodash';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  @ViewChild('template') public shoppingCart: any;

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  cartTxtQuantityProducts: string = "0";

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private dialogService: NbDialogService,
    private shoppingCartService: ShoppingCartService,
    private nbSearchService: NbSearchService,
    private searchService: SearchService
  ) {

    this.nbSearchService.onSearchSubmit().subscribe((s) => {
      this.searchService.onSubmitSearch(s);
    });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);

    this.shoppingCartService.getShoppingCart().subscribe((r) => {
      const quantityProducts = (_.sumBy(r, 'quantityInCart') || "0")
      this.cartTxtQuantityProducts = quantityProducts > 99 ? '99+' : quantityProducts;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  openCartShoping() {
    if (parseInt(this.cartTxtQuantityProducts) != 0) {
      this.openCartShopingModal();
    }
  }

  protected openCartShopingModal() {
    this.dialogService.open(ShoppingCartComponent, { hasBackdrop: true });
  }
}
