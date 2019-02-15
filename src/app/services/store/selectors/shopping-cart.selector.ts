
import { createSelector } from '@ngrx/store';
import { ProductsStoreState } from '../shoping-cart-store';
import { getShoppingCartState } from './index';

export const getShoppingCartProductsState = createSelector(
  getShoppingCartState,
  (state: ProductsStoreState) => state.shoppingCart
);

