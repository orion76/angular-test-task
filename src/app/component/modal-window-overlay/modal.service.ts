import { Injectable, InjectionToken, EventEmitter } from '@angular/core';
import { IModalData, IModalService } from '../types';
import { Observable } from 'rxjs';
// import { EventEmitter } from 'events';

export const MODAL_SERVICE = new InjectionToken('MODAL_SERVICE');

@Injectable({providedIn: 'root'})
export class ModalService implements IModalService {
  private openEmitter = new EventEmitter<IModalData>();
  private closeEmitter = new EventEmitter<boolean>();


  onClose(): Observable<boolean> {
    return this.closeEmitter.asObservable();
  }

  onOpen(): Observable<IModalData> {
    return this.openEmitter.asObservable();
  }

  open(data: IModalData) {
    this.openEmitter.emit(data);
  }

  close() {
    this.closeEmitter.emit(true);
  }
}
