//import { Component, Input, OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRender2CellTableComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this['cell'].value.toString().toUpperCase();
  }

}

@Component({
  template: `
   <input [ngClass]="inputClass"
            #name
            class="form-control"
            [onlyNumbers]="true"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (keyup)="updateValue()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
  `,
  styleUrls: ['custom-render-cell-table.component.scss'],

})
export class CustomRenderCellTableComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('name') name: ElementRef;

  constructor() {
    super();
  }

  updateValue() {
    this.cell.newValue = parseInt(this.name.nativeElement.value);
  }

  ngAfterViewInit() {
    if(!this.cell.isEditable() && !this.name.nativeElement.classList.contains('disabledEdition')){
      this.name.nativeElement.classList.add('disabledEdition')
    }
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.getValue().toString();
    }
  }
}