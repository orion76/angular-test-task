import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProductModel } from '../../product.model';
import { createItem, updateItem } from '../../store/product.actions';
import { AppState } from '../../../store/reducers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currenciesData } from '../../../data/currencies.data';
import { MODAL_SERVICE } from '../../../component/modal-window-overlay/modal.service';
import { IModalService } from '../../../component/types';
import { existingSkuValidator } from '../../form-validators/sku.validator';
import { ErrorMessages } from '../../../types/forms';
import { greaterThanZeroValidator } from '../../form-validators/number.validator';

@Component({
  selector: 'product-form',
  templateUrl: 'product-form.component.html',
  host: {
    class: 'product-form'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  @Input() product: IProductModel;
  formTitle = '';
  entityForm: FormGroup;
  currencies: any[];

  @ViewChild('templateValid', {read: TemplateRef}) templateValidRef: TemplateRef<any>;
  @ViewChild('templateInvalid', {read: TemplateRef}) templateInvalid: TemplateRef<any>;

  errorContext: Record<string, ErrorMessages> = {
    name: {
      required: 'Product name is require'
    },
    sku: {
      required: 'Sku is require',
      alreadyExist: 'Sku is already exist',
    },
    price__amount: {
      greaterThanZero: 'Price value is require'
    },
    price__currencyCode: {
      required: 'Price currency is require'
    },
  };

  getMessageTemplate(...path: string[]) {
    const formControl: FormControl = this.controls(path);
    if (formControl.errors && formControl.dirty) {
      return this.templateInvalid;
    } else {
      return this.templateValidRef;
    }
  }

  getErrorMessages(...path: string[]): { messages: string[] } {
    const formControl: FormControl = this.controls(path);
    const message_key = path.join('__');
    // console.log('message_key', message_key);
    const messagesAll: ErrorMessages = this.errorContext[message_key];
    const messages = formControl.errors ? Object.keys(formControl.errors).map((errorKey) => messagesAll[errorKey]).filter(Boolean) : [];
    return {messages};
  }

  constructor(private store: Store<AppState>,
              @Inject(MODAL_SERVICE) private modalService: IModalService) {
  }

  ngOnInit() {

    this.currencies = [{code: null, name: '--Select--'}];
    Object.keys(currenciesData).forEach((code) => {
      const {name} = currenciesData[code];
      this.currencies.push({code, name});
    });

    this.entityForm = new FormGroup({

      id: new FormControl(null),
      sku: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      price: new FormGroup({
        amount: new FormControl(null, [greaterThanZeroValidator]),
        currencyCode: new FormControl('RUB', [Validators.required]),
      }),
      description: new FormControl(null)
    });


    if (this.product.id) {
      this.formTitle = 'Edit product';
    } else {
      this.formTitle = 'Create product';
      this.entityForm.get('sku')?.setAsyncValidators([existingSkuValidator(this.store)]);
    }

    this.entityForm.patchValue(this.product);
  }

  controls(path: string[]): FormControl {
    return this.entityForm.get(path) as FormControl;
  }


  submit() {
    const {entityForm} = this;

    const product: IProductModel = entityForm.getRawValue();
    const {id} = product;
    if (id) {
      this.store.dispatch(updateItem({update: {id, changes: product}}));
    } else {

      this.store.dispatch(createItem({product}));
    }
    this.close();
  }

  close() {
    this.modalService.close();
  }

  ngAfterViewInit(): void {
  }
}

