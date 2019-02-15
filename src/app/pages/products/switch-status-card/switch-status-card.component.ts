import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { state } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-switch-status-card',
  styleUrls: ['./switch-status-card.component.scss'],
  template: `
    <nb-card *ngIf="active" (click)="onSwitch()" [className]="active.type">
      <div class="icon-container">
        <div class="icon {{ active.type }}">
          <i [className]="active.icon"></i>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ active.label }}</div>
      </div>
    </nb-card>
  `,
})
export class SwitchStatusCardComponent implements OnInit {
  
  public title: string = 'Stock';
  public active =  [];
  private states = [
    {
      'is': true,
      'icon' : 'filter-icon filter-icon-stock', 
      'label': 'Todos',
      'name': 'all',
      'type': 'primary'
    }, 
    {
      'is': false, 
      'icon' : 'filter-icon filter-icon-delivery', 
      'label': 'Disponibles',
      'name': 'available',
      'type': 'success'
    },
    {
      'is' : false,
      'icon' : 'filter-icon filter-icon-not-available', 
      'label' : 'No disponible',
      'name': 'notAvailable',
      'type': 'off'
    }
  ];

  
  ngOnInit(){
    this.active = _.find(this.states, { 'is': true });
  }

  @Output() status: EventEmitter<any> = new EventEmitter();
  
  onSwitch(){
    this.nextState();
    this.active = this.getActive();
    let event = {
      filter : this.active['name'],
      params : false
    }
    this.status.emit(event);
  }
  
  nextState(){
     _.find(this.states, (v, i) => {
      let next = i + 1;
      if(v.is){ 
         this.setActive(  (next == this.states.length) ? 0 : next , i); 
         return true;
      }
    })
  }

  getActive(){
    return _.find(this.states, { 'is': true });
  }

  setActive(iNewActive, iOldActive){
    this.states[iOldActive].is = false;
    this.states[iNewActive].is = true;
  }

}
