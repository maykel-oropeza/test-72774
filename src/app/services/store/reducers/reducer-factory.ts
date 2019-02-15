import { ActionReducerMap } from '@ngrx/store';
import { ProductsStoreState } from '../shoping-cart-store';
import { shopingCartReducer } from './shopping-cart.reducer';


export const Reducers: ActionReducerMap<ProductsStoreState> = {
  shoppingCart: shopingCartReducer
};