import { Observable } from 'rxjs';
import { IProductModel } from './product.model';
import { UpdateNum } from '@ngrx/entity/src/models';


export interface IIdGeneratorService {
  next(): number;

  setLast(id: number): void;
}


export interface IProductDataService {

  getAll(): Observable<IProductModel[]>;

  load(id: number): Observable<IProductModel>;

  create(product: IProductModel): Observable<IProductModel>;

  delete(productId: number): Observable<IProductModel>;

  update(changes: Partial<IProductModel>): Observable<IProductModel>;
}

export interface IProductMessageService {
  errorCreate(product: IProductModel, error: string): void;

  errorUpdate(update: UpdateNum<IProductModel>, error: string): void;

  errorDelete(id: number, error: string): void;

  errorGetAll(error: string): void;

  confirmDelete(id: number, name: string, sku: string): Observable<string>;
}
