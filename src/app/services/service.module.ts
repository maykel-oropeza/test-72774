import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { ShoppingCartService } from './products/shoping-cart.service'
import { Reducers } from './store/reducers/reducer-factory'

const SERVICES = [
  ShoppingCartService
]

@NgModule({
  imports: [
    StoreModule.forFeature('services', Reducers),
  ],
  providers: [
    ...SERVICES
  ],
})
export class ServicesModule { 
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
