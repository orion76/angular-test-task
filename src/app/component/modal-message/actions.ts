import { IModalMessageData } from './types';


export interface IActionOpen {
  type: 'open';
  data: IModalMessageData;
}

export interface IActionClose {
  type: 'close';
  data: string;
}


export type TActions = IActionOpen | IActionClose;


export function getDataOpen(action: TActions): IModalMessageData | null {
  return action.type === 'open' ? action.data : null;

}

export function getDataClose(action: TActions): string {
  return action.type === 'close' ? action.data : '';

}


