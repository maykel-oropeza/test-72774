import { Component, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ShoppingCartService } from '../../../services';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { CustomRenderCellTableComponent } from './custom-render-cell-table.component';
import { Subscription } from 'rxjs';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

import * as _ from 'lodash';

@Component({
  selector: 'shoppping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('updateSwal') private updateSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;

  public source: LocalDataSource = new LocalDataSource();
  private _shoppingCartServiceSubscription$ :  Subscription;

  private notEdit = {
    type: 'custom',
    valuePrepareFunction: (cell, row) => row,
    component: CustomRenderCellTableComponent,
  }

  settings = {
    hideSubHeader: true,
    actions: {
      position : 'right',
      edit: true,
      delete: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Product',
        type: 'text',
        editable: false,
        editor: this.notEdit
      },
      price: {
        title: 'Price',
        type: 'html',
        editable: false,
        editor: this.notEdit
      },
      quantityInCart: {
        title: 'Quantity',
        type: 'number',
        editable: true,
        editor: this.notEdit
      }
    },
  };

  constructor(
    protected ref: NbDialogRef<ShoppingCartComponent>,
    public shoppingCartService : ShoppingCartService,
    private service: SmartTableData
  ) {
    this._shoppingCartServiceSubscription$ = this.shoppingCartService.getShoppingCart().subscribe((r)=> {
      this.source.load(r);
    });
  }

  onDeleteConfirm(event): void {
    this.deleteSwal.show().then((t)=> {
      if(_.get(t,'value')){
        this.successSwal.show();
        event.confirm.resolve();
        this.shoppingCartService.shopingCartRemoveProduct(event.data);
      }else{
        event.confirm.reject();
      }
    }).catch((c)=> {
      event.confirm.reject();
    });
  }

  onEditConfirm(event): void {
    this.updateSwal.show().then((t)=> {
      if(_.get(t,'value')){
        this.successSwal.show();
        event.confirm.resolve();
        this.shoppingCartService.updateShoppingCart(event.newData);
      }else{
        event.confirm.reject();
      }
    }).catch((c)=> {
      event.confirm.reject();
    });
  }

  onDestroy() {
    this._shoppingCartServiceSubscription$ ? this._shoppingCartServiceSubscription$.unsubscribe() : null;
  }
}