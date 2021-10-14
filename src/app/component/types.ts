import { Observable } from 'rxjs';
import { Type } from '@angular/core';

export interface IModalData {
  title: string;
  component: Type<any>;
  inputs?: Record<string, any>;
}

export interface IModalService {
  open(data: IModalData): void;

  close(): void;

  onOpen(): Observable<IModalData>;

  onClose(): Observable<boolean>;
}
