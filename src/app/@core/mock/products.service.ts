import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';

import * as _ from 'lodash'; 

export interface Products {
    products: []
}

@Injectable()
export class ProductsService {

    constructor(
        private http: HttpClient
    ){}
    
    getAllProducts(): Observable<any> {
        const jsonUrl = './assets/data/products.json';
        return this.http.get(jsonUrl).pipe(
            tap((r: Products) => { return { products : this.parseProducts(r.products) } })
        );
    }

    parseProducts(products){
        _.map(products, (p) =>{
            if(p.price){
                if(p.price.charAt(0) == "$"){ p.price = p.price.substring(1)}
                p.price = p.price.replace(',','');
            }
        })
    }
    

}