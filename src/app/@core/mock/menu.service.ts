import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { CategoriesService } from './categories.service';

import * as _ from 'lodash'; 

@Injectable()
export class MenuService {

    constructor(
        private categoriesService : CategoriesService 
    ){}

    getItems(): Observable<any> {
        return this.categoriesService.getCategories().pipe(
            map((categories: any) => {
                const allItems = this.buildAllItemsMenu(categories);
                return this.getItemsMenu(allItems)
            })
        );
    }

    public getItemsMenu(allItems) {
        return [
            {
              title: 'Categories',
              icon: 'nb-e-commerce',
              children: [...(allItems)],
            }
          ];
    }

    private buildAllItemsMenu(items) {
        return _.reduce(items.categories, (list,category,i) =>{
            return list.concat(this.buildChildrenMenu(category, true));
        },[]);
    }

    private buildChildrenMenu(rawItem, parent?){
        let item = this.buildItem(rawItem,  parent || null);
        if(_.get(rawItem, 'sublevels')){
            return { 
                ...item, children: 
                _.reduce(rawItem.sublevels, (final,children)=> {
                    return final.concat(_.get(children,'sublevels') ? this.buildChildrenMenu(children,false) : this.buildItem(children, false) )
                },[]) 
            };
        }else{
            return { ...item };
        }
    }

    private buildItem(rawItem,isParent?) {
        return {
            title : rawItem.name || 'unknow',
            link: isParent ? [] : `/pages/products/${rawItem.id}` || 'unknow',
            pathMatch: 'full'
        }
    }
}