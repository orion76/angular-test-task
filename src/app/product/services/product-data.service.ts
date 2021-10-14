import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductModel } from '../product.model';
import { IProductDataService } from '../types';
import { log } from '../../utils/rxjs.util';

export const PRODUCT_DATA_SERVICE = new InjectionToken('PRODUCT_DATA_SERVICE');


@Injectable()
export class ProductDataService implements IProductDataService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<IProductModel[]> {
    return this.http.get<IProductModel[]>('/api/products');
  }

  load(id: number): Observable<IProductModel> {
    return this.http.get<IProductModel>('/api/products/' + id).pipe(log('121212121212'));
  }

  create(product: IProductModel): Observable<IProductModel> {
    return this.http.post<IProductModel>('/api/products', product);
  }

  delete(productId: number): Observable<any> {
    return this.http.delete('/api/products/' + productId);
  }

  update(changes: Partial<IProductModel>): Observable<any> {
    return this.http.put('/api/products', changes);
  }
}
