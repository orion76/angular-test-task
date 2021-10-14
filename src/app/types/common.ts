export type TButtonType = 'primary' | 'second' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';


export interface IButton {
  text: string;
  type: TButtonType;
}

export interface IButtonNamed extends IButton {
  name: string;
}

export const buttonCancel: IButtonNamed = {
  name: 'cancel',
  text: 'Cancel',
  type: 'second'
};

export const buttonSubmit: IButtonNamed = {
  name: 'submit',
  text: 'Submit',
  type: 'primary'
};
