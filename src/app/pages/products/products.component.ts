import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router'
import { ProductsService } from '../../@core/mock/products.service';
import { Observable, observable, Subject, forkJoin, of } from 'rxjs';
import { map, filter, withLatestFrom, switchMap, takeWhile } from 'rxjs/operators';

import * as _ from 'lodash';
import { NbSearchService } from '@nebular/theme';
import { SearchService } from '../../@core/utils';

@Component({
  selector: 'ngx-products',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnDestroy {

  alive: boolean = true;
  sublevel_id: number = 0;
  products$: Observable<any>;
  productsWithFilters$: Observable<any>;
  filtersSubject$: Subject<any> = new Subject();

  filters = {
    'subLevel': (products) => _.filter(products, (p) => p.sublevel_id == this.sublevel_id),
    'available': (products) => _.filter(products, (p) => p.available),
    'notAvailable': (products) => _.filter(products, (p) => !p.available),
    'quantityMin': (products, filter) => _.filter(products, (p) => p.quantity >= filter.min),
    'fromTo': (products, filter) => _.filter(products, (p) => p.price >= filter.min && p.price <= filter.max),
    'sortPriceUp': (products) => products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)),
    'sortPriceDown': (products) => products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
    'sortStatusUp': (products) => products.sort((a, b) => b.available - a.available),
    'sortStatusDown': (products) => products.sort((a, b) => a.available - b.available),
    'sortQuantityUp': (products) => products.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity)),
    'sortQuantityDown': (products) => products.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity)),
    'search': (products, filter) => _.filter(products, (p) => p.name == filter.term)
  }

  filtersConfig: any = {
    'subLevel': { filter: 'noSet' },
    'status': { filter: 'noSet' },
    'quantity': { filter: 'noSet' },
    'price': { filter: 'noSet' },
    'sort': { filter: 'noSet' },
    'search': { filter: 'noset' }
  };

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private searchService: SearchService
  ) {


    this.loadProducts();
    this.onSearch();
    this.onFilterBySublevel();
    this.onFilters();
  }

  loadProducts() : void {
    this.products$ = this.productsService.getAllProducts().pipe(map((r) => r.products));
  }

  onSwitchStatus(event) : void {
    this.filtersConfig.status = event;
    this.filtersSubject$.next(event);
  }

  onFilteredQuantity(event) : void {
    this.filtersConfig.quantity = event;
    this.filtersSubject$.next(event);
  }

  onFilteredPrice(event) : void {
    this.filtersConfig.price = event;
    this.filtersSubject$.next(event);
  }

  onSelectedOrder(event) : void {
    this.filtersConfig.sort = event;
    this.filtersSubject$.next(event);
  }

  onSearch() : void {
    this.searchService.onSearch$
      .pipe(takeWhile(() => this.alive))
      .subscribe((s) => {
        this.filtersConfig.search = {
          filter: s.term ? 'search' : 'noSet',
          params: true,
          data: {
            term: s.term
          }
        };
        this.filtersSubject$.next(this.filtersConfig.search);
      });
  }
  
  onFilterBySublevel() : void {
    this.route.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0),
    ).subscribe((event: ActivationEnd) => {
      if (this.activatedRoute.firstChild) {
        this.activatedRoute.firstChild.paramMap.subscribe((params) => {
          this.sublevel_id = parseInt(params.get("sublevel_id")) || 0;
        });
      } else {
        this.sublevel_id = 0;
      }
      this.filtersConfig.subLevel = {
        filter: this.sublevel_id != 0 ? 'subLevel' : 'noSet',
        params: true,
        data: {
          id: this.sublevel_id
        }
      };
      this.filtersSubject$.next(this.filtersConfig.subLevel);
    });
  }

  onFilters() : void {
    this.filtersSubject$.subscribe((f) => {
      this.productsWithFilters$ = this.products$.pipe(
        map((p) => {
          _.forEach(this.filtersConfig, (v) => {
            if (_.get(v, 'params')) {
              p = this.filters[v.filter] ? this.filters[v.filter](p, v.data) : p;
            } else {
              p = this.filters[v.filter] ? this.filters[v.filter](p) : p;
            }
          });
          return p;
        })
      )
    })
  }

  ngOnDestroy() : void {
    this.alive = false;
  }

}
