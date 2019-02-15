import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-filter-by-price-card',
  styleUrls: ['./filter-by-price-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container" (click)="sendFilters()"  [ngClass]="{'disabled': disabled}">
        <div class="icon success">
          <i class="filter-icon-funnel-coin-1" ></i>
        </div>
      </div>
      <div class="wrapper-filters">
        <div class="input-group filter-icon-arrow-from-top">
            <input type="number" value="" [(ngModel)]="min" (ngModelChange)="onFieldChange($event)" [onlyNumbers]="true" nbInput fullWidth fieldSize="small" class="form-control"  placeholder="Mínimo" />
        </div>
        <div class="input-group filter-icon-arrow-from-bottom">
            <input type="number" value="" [(ngModel)]="max" (ngModelChange)="onFieldChange($event)" [onlyNumbers]="true" nbInput fullWidth fieldSize="small" class="form-control"  placeholder="Máximo" />
        </div>
      </div>
    </nb-card>
  `,
})
export class FilterByPriceCardComponent {

  @Output() filteredPrice: EventEmitter<any> = new EventEmitter();

  min : any = '';
  max : any = '';
  disabled : boolean = true;
  
  onFieldChange(event){
    this.disabled = (
      (!this.min || !this.max) && 
      (this.max == '' && this.max == '') && 
      (this.max == 0 && this.max == 0)
    );
  }
    
  sendFilters() {
    if(this.max >= 0 || this.min >= 0){
      this.max = this.max == '' ? 0 : this.max;
      this.min = this.min == '' ? 0 : this.min;
      if(this.min > this.max){
        let tmp = this.max;
        this.max = this.min
        this.min = tmp;
      }
      let filter = {
        filter: 'fromTo',
        params: true,
        data: { 
          min: this.min,
          max : this.max
        }
      }
      this.filteredPrice.emit(filter)
    }
  }

  
}
