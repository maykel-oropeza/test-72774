import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-product-card-front',
  styleUrls: ['./product-card-front.component.scss'],
  templateUrl: './product-card-front.component.html',
})
export class ProductCardFrontComponent {
  
  @Input() public product;

  constructor() {
  }
}
