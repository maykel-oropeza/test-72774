import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartProduct } from '../models';
import { ProductsStoreState } from '../store/shoping-cart-store';
import { ShopingCartLoad, ShopingCartUpdate, ShopingCartAddProduct, ShopingCartRemoveProduct } from '../store/actions/shoping-cart.actions'
import { getShoppingCartProductsState } from '../store/selectors/shopping-cart.selector';

import * as _ from 'lodash';

@Injectable()
export class ShoppingCartService {
  
  shopingCartLoaded$: Observable<ShoppingCartProduct[]>;

  constructor(
    private store : Store<ProductsStoreState>
  ) {
    this.loadShoppingCart();
    this.shopingCartLoaded$ = this.store.select(getShoppingCartProductsState);
  }

  loadShoppingCart() {
  }

  public updateShoppingCart(ShoppingCart: ShoppingCartProduct) {
    this.store.dispatch(new ShopingCartUpdate(ShoppingCart));
  }

  public shopingCartAddProduct(ShoppingCart: ShoppingCartProduct) {
    this.store.dispatch(new ShopingCartAddProduct(ShoppingCart));
  }
  
  public shopingCartRemoveProduct(ShoppingCart: ShoppingCartProduct) {
    this.store.dispatch(new ShopingCartRemoveProduct(ShoppingCart));
  }

  public getShoppingCart(): Observable<any> {
    return this.shopingCartLoaded$;
  }
  
}