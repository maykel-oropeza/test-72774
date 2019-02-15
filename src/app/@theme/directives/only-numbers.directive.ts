import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {

  @Input() onlyNumbers: boolean;

  constructor(private el: ElementRef) {
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    let e = <KeyboardEvent> event;
    if(this.onlyNumbers){
      if(/^\d+$/.test(e.key)){ return; }
      else{ e.preventDefault(); e.returnValue = false; return false; }
    }
  
  }

}