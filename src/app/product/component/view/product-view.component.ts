import { Component, Inject, Input, OnInit } from '@angular/core';
import { IProductModel } from '../../product.model';
import { MODAL_SERVICE } from '../../../component/modal-window-overlay/modal.service';
import { IModalService } from '../../../component/types';

@Component({
  selector: 'product-view',
  templateUrl: 'product-view.component.html'
})
export class ProductViewComponent implements OnInit {
  @Input() product: IProductModel;

  constructor(@Inject(MODAL_SERVICE) private modalService: IModalService) {
  }

  ngOnInit() {
  }

  close() {
    this.modalService.close();
  }
}

