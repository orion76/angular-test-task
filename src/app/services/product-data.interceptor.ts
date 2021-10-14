import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { getAllProducts, selectMaxId, selectProduct } from '../product/store/product.selectors';
import { IProductModel } from '../product/product.model';
import { log } from '../utils/rxjs.util';

@Injectable()
export class ProductDataInterceptor implements HttpInterceptor {
  private jsonDataUrl = 'assets/products-data.json';

  constructor(private http: HttpClient,
              private store: Store<AppState>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  throwCoin() {
    if (Math.round(Math.random() * 2)) {
      throw new Error('Random error');
    }
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {

    this.throwCoin();

    const {url, method} = req;

    let id: number;
    let ret: Observable<HttpEvent<any>> | null = null;

    if (url.startsWith('/api/products')) {
      switch (method) {
        case 'GET':
          id = this.getId(url);
          if (id) {
            ret = this.loadOne(id, req, next);
          } else {
            ret = this.loadAll(req, next);
          }
          break;
        case 'POST':
          ret = this.store.pipe(
            select(selectMaxId),
            take(1),
            map((last_id: number) => new HttpResponse({status: 200, body: {...req.body, id: ++last_id}})),
            log('select(selectMaxId)'),
          );
          break;
        case 'PUT':
          ret = of(new HttpResponse({status: 200, body: {...req.body}}));
          break;
        case 'DELETE':
          id = this.getId(url);
          ret = of(new HttpResponse({status: 200, body: id}));
          break;
      }
    }
    if (!ret) {
      ret = next.handle(req);
    }
    return ret;
  }

  replaceUrl(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({url: this.jsonDataUrl});
  }


  loadFromJson(id: number, req: HttpRequest<any>, next: HttpHandler): Observable<IProductModel | undefined> {
    return next.handle(this.replaceUrl(req)).pipe(
      map((response: HttpEvent<any>) => response instanceof HttpResponse ? response.body : null),
      map((products: IProductModel[]) => products.find((product) => product.id === id)),
    );
  }

  loadOne(id: number, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.store.pipe(
      select(selectProduct, {id}),
      mergeMap((product) => product ? of(new HttpResponse({status: 200, body: product})) : this.loadFromJson(id, req, next)),
    );
  }

  loadAll(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.store.pipe(
      select(getAllProducts),
      mergeMap((products) => products?.length ? of(products) : next.handle(this.replaceUrl(req)).pipe()),
    );
  }

  getId(url: any): number {
    return url.split('/')[3];
  }
}


