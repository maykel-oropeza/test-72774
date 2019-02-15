import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../../../services'

import * as _ from 'lodash';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ngx-product-card-back',
  styleUrls: ['./product-card-back.component.scss'],
  templateUrl: './product-card-back.component.html',
})
export class ProductCardBackComponent {
  
  @Input() public product;
  private quantityDefault : number = 1;
  public quantity = this.quantityDefault;
  
  constructor(
    private shoppingCartService : ShoppingCartService
  ) {}

  ctrlQuantity(increment: number){
    if (increment<0 && this.quantity == this.quantityDefault) {
      return;
    }
    this.quantity += increment;
  }

  addToCart(){
    const productToCart = { 
      ...(_.pick(this.product, ['price', 'name', 'id'])),
      quantityInCart: this.quantity
    }
    this.shoppingCartService.shopingCartAddProduct(productToCart);
  }

  updateCart(){
    const productToCart = { 
      ...(_.pick(this.product, ['price', 'name', 'id'])),
      quantityInCart: this.quantity
    }
    this.shoppingCartService.updateShoppingCart(productToCart);
  }

}
