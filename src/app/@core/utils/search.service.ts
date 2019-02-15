import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchService {

  public onSearch$: Subject<any> = new Subject();  

  constructor() {
  }

  onSubmitSearch(event: Object) {
    this.onSearch$.next(event);
  }
}
