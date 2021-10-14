import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IModalMessageData, IModalMessageService } from './types';
import { getDataClose, getDataOpen, TActions } from './actions';
import { filter, map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ModalMessageService implements IModalMessageService {
  private eventSubject = new ReplaySubject<TActions>(1);
  private event$: Observable<TActions> = this.eventSubject.asObservable();

  constructor() {

  }

  open(data: IModalMessageData): Observable<string> {
    const type = 'open';
    this.eventSubject.next({type, data});
    return this.onClose();
  }

  onClose(): Observable<string> {
    return this.event$.pipe(
      map(getDataClose),
      filter<string>(Boolean),
    );
  }


  onOpen(): Observable<IModalMessageData | null> {
    return this.event$.pipe(map(getDataOpen));
  }

  close(data: string): void {
    const type = 'close';
    this.eventSubject.next({type, data});
  }
}
