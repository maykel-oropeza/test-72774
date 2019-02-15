import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-product-card',
  styleUrls: ['./product-card.component.scss'],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {

  @Input() public product;

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
