import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalMessageService } from '../../component/modal-message/modal-message.service';
import { buttonCancel, buttonSubmit } from '../../types/common';
import { filter, take, tap } from 'rxjs/operators';
import { IProductMessageService } from '../types';
import { UpdateNum } from '@ngrx/entity/src/models';
import { IProductModel } from '../product.model';
import { EMessageType } from '../../component/modal-message/types';

export const PRODUCT_MESSAGE_SERVICE = new InjectionToken('PRODUCT_MESSAGE_SERVICE');


@Injectable()
export class ProductMessageService implements IProductMessageService {


  constructor(private messageService: ModalMessageService) {
  }

  errorGetAll(error: string) {
    return this.messageService.open(
      {
        type: EMessageType.ERROR,
        title: 'Error get products',
        text: `
        Products not loaded.
        `,
        buttons: [buttonCancel]
      }
    ).pipe(
      take(1),
      tap((button) => {
        if (button === 'cancel') {
          this.messageService.close(button);
        }
      })
    );
  }

  errorCreate(product: IProductModel, error: string) {
    const {sku, name} = product;
    return this.messageService.open(
      {
        type: EMessageType.ERROR,
        title: 'Error product create',
        text: `
        Error create product.<br>
        Sku: <b>${sku}</b><br>
        Name: <b>${name}</b><br>
        `,
        buttons: [buttonCancel]
      }
    ).pipe(
      take(1),
      tap((button) => {
        if (button === 'cancel') {
          this.messageService.close(button);
        }
      })
    );
  }

  errorUpdate(update: UpdateNum<IProductModel>, error: string) {
    const {name, sku} = update.changes;
    return this.messageService.open(
      {
        type: EMessageType.ERROR,
        title: 'Error update product',
        text: `
        Product not updated.<br>
        Sku: <b>${sku}</b><br>
        Name: <b>${name}</b><br>
        `,
        buttons: [buttonCancel]
      }
    ).pipe(
      take(1),
      tap((button) => {
        if (button === 'cancel') {
          this.messageService.close(button);
        }
      })
    );
  }

  errorDelete(id: number, error: string) {
    return this.messageService.open(
      {
        type: EMessageType.ERROR,
        title: 'Error product delete',
        text: `
        Product not deleted.<br>
        ID: <b>${id}</b><br>
        `,
        buttons: [buttonCancel]
      }
    ).pipe(
      take(1),
      tap((button) => {
        if (button === 'cancel') {
          this.messageService.close(button);
        }
      })
    );
  }


  confirmDelete(id: number, name: string, sku: string): Observable<string> {
    return this.messageService.open(
      {
        type: EMessageType.DEFAULT,
        title: 'Product delete',
        text: `
        You really want to delete product?<br>
        Sku: <b>${sku}</b><br>
        Name: <b>${name}</b><br>
        `,
        buttons: [buttonSubmit, buttonCancel]
      }
    ).pipe(
      take(1),
      filter((button) => button === 'submit')
    );
  }
}
