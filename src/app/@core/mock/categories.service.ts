import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';

import * as _ from 'lodash'; 

export interface Sublevels {
    id: number,
    name: string,
    sublevels: Levels[]
}

export interface Levels {
    id: number,
    name: string,
    sublevels: Sublevels[]
}

export interface Categories {
    categories: Levels[]
}

@Injectable()
export class CategoriesService {

    constructor(
        private http: HttpClient
    ){}
    
    getCategories(): Observable<any> {
        const jsonUrl = './assets/data/categories.json';
        return this.http.get(jsonUrl).pipe(
            tap((r: Categories) => { return { categories : r.categories } })
        );
    }

    public buildChildrenMenu(rawItem){
        let item = this.buildItem(rawItem);
        if(_.get(rawItem, 'sublevels')){
            return { 
                ...item, children: 
                _.reduce(rawItem.sublevels, (final,children,i)=> {
                    return final.concat(_.get(children,'sublevels') ? this.buildChildrenMenu(children) : this.buildItem(children) )
                },[]) 
            };
        }else{
            return { ...item };
        }
    }

    private buildItem(rawItem){
        return {
            title : rawItem.name || 'unknow',
            link: '' || 'unknow'
        }
    }
}