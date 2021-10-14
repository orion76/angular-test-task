import { IButtonNamed } from '../../types/common';
import { Observable } from 'rxjs';


export enum EMessageType {
  DEFAULT = 'white',
  ERROR = 'danger',
  WARNING = 'warning',
}

export interface IModalMessageService {
  open(data: IModalMessageData): Observable<string | null>;

  onClose(): Observable<string | null>;

  onOpen(): Observable<IModalMessageData | null>;

  close(data: string): void;
}

export interface IModalMessageData {
  type: EMessageType;
  title: string;
  text: string;
  buttons?: IButtonNamed[];
}
