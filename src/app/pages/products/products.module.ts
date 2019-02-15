import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule } from './products-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardFrontComponent } from './product-card/front-side/product-card-front.component';
import { ProductCardBackComponent } from './product-card/back-side/product-card-back.component';
import { SwitchStatusCardComponent } from './switch-status-card/switch-status-card.component';
import { FilterByQuantityCardComponent } from './filter-by-quantity-card/filter-by-quantity-card.component';
import { SelectSortCardComponent } from './select-sort-card/select-sort-card.component';
import { FilterByPriceCardComponent } from './filter-by-price-card/filter-by-price-card.component';

const COMPONENTS = [
  ProductsComponent,
  ProductCardComponent,
  ProductCardFrontComponent,
  ProductCardBackComponent,
  SwitchStatusCardComponent,
  FilterByQuantityCardComponent,
  FilterByPriceCardComponent,
  SelectSortCardComponent
]

const SERVICES = [
]

@NgModule({
  imports: [
    ThemeModule,
    DashboardModule,
    ProductsRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES
  ],
})
export class ProductsModule { 
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ProductsModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
