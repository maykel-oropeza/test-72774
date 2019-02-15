
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsStoreState } from '../shoping-cart-store';

export const getShoppingCartState = createFeatureSelector<ProductsStoreState>('services');