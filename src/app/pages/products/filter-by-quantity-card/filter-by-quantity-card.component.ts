import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-filter-by-quantity-card',
  styleUrls: ['./filter-by-quantity-card.component.scss'],
  template: `
    <nb-card *ngIf="active"[className]="active.type">
      <div (click)="onSearch()" class="icon-container" [ngClass]="{'disabled': disabled}">
        <div class="icon {{ active.type }}">
          <i [className]="active.icon"></i>
        </div>
      </div>
      <div class="details">
        <div class="title">{{ active.title }}</div>
        <div class="input-group filter-icon-quantity">
            <input type="number" [(ngModel)]="filterQuantity" (ngModelChange)="onFieldChange($event)" [onlyNumbers]="true" nbInput fullWidth fieldSize="small" class="form-control"  placeholder="uds." />
        </div>
      </div>
    </nb-card>
  `,
})
export class FilterByQuantityCardComponent {

  
  @Output() filteredQuantity: EventEmitter<any> = new EventEmitter();
  
  filterQuantity : any = 'uds.';
  active = {
    'icon' : 'filter-icon filter-icon-filter-product', 
    'title': 'Cantidad Mínima',
    'name': 'notSort',
    'type': 'info'
  }
  disabled : boolean = true;
  
  onFieldChange(event){
    this.disabled = this.invalidInput();
  }

  onSearch(){
    if(!this.disabled){ 
      let event = {
        filter : 'quantityMin',
        params: true,
        data : {
          min: this.filterQuantity
        }
      }
      this.filteredQuantity.emit(event);
    }
  }

  invalidInput = () => (!this.filterQuantity || !(this.filterQuantity > 0))

}
