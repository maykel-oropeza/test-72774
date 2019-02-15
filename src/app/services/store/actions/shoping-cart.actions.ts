import { Action } from '@ngrx/store';

export const ShoppingCartActionTypes = {
  LOAD_SHOPPING_CART: '[ShoppingCart] load',
  SHOPPING_CART_ADD_PRODUCT: '[ShoppingCart] add Product',
  SHOPPING_CART_UPDATE: '[ShoppingCart] update',
  SHOPPING_CART_REMOVE_PRODUCT: '[ShoppingCart] remove Product',
};

export class ShopingCartLoad implements Action {
  type = ShoppingCartActionTypes.LOAD_SHOPPING_CART;
  constructor(public payload: any) {}
}

export class ShopingCartAddProduct implements Action {
  type = ShoppingCartActionTypes.SHOPPING_CART_ADD_PRODUCT;
  constructor(public payload: any) {}
}

export class ShopingCartUpdate implements Action {
  type = ShoppingCartActionTypes.SHOPPING_CART_UPDATE;
  constructor(public payload: any) {}
}

export class ShopingCartRemoveProduct implements Action {
  type = ShoppingCartActionTypes.SHOPPING_CART_REMOVE_PRODUCT;
  constructor(public payload: any) {}
}


export type ShoppingCartActions = ShopingCartLoad | ShopingCartAddProduct | ShopingCartUpdate | ShopingCartRemoveProduct