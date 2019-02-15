import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-select-sort-card',
  styleUrls: ['./select-sort-card.component.scss'],
  template: `
    <nb-card>
    <nb-card-header>Ordenar por:</nb-card-header>
      <nb-card-body>
        <div class="wrapper-select">
          <div class="icon-container">
            <div class="icon {{ active.type }}">
              <i [className]="active.icon"></i>
            </div>
          </div>
          <nb-select placeholder="Seleccione" size="xsmall" shape="rectangle" (selectedChange)="onChangeSelect($event)">
            <nb-option-group class="option-group" *ngFor="let g of  objectKeys(selectSortData);" title="{{ selectSortData[g].title }}" >
              <nb-option value="{{ k }}" *ngFor="let k of objectKeys(selectSortData[g].values)">{{ selectSortData[g].values[k] }}</nb-option>
            </nb-option-group>
          </nb-select>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class SelectSortCardComponent {

  @Output() selectedOrder: EventEmitter<any> = new EventEmitter();
  
  objectKeys = Object.keys;

  active = {
    type: 'info',
    icon : "filter-icon-sort-amount-up"
  }

  selectSortData : Object = {
    price : {
      title: 'Precio',
      values: {
        'sortPriceUp' : 'Mayor Precio',
        'sortPriceDown' : 'Menor Precio'
      }
    },
    status: {
      title: 'Disponibilidad',
      values: {
        'sortStatusUp' : 'Disponible',
        'sortStatusDown' : 'No disponible'
      }
    },
    quantity: {
      title: 'Cantidad en Stock',
      values: {
        'sortQuantityUp' : 'Mayor cantidad',
        'sortQuantityDown' : 'Menor cantidad'
      }
    }
  }

  onChangeSelect(e){
    let event = {
      filter : e,
      params: false,
    }
    this.selectedOrder.emit(event);
    this.active.icon = `filter-icon-sort-amount-${ e.endsWith("Up") ? 'up' : e.endsWith("Down") ? 'down' : ''}`;
  }

}
