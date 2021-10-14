import { Component, Inject } from '@angular/core';
import { MODAL_SERVICE } from './component/modal-window-overlay/modal.service';
import { IModalService } from './component/types';
import { ProductFormComponent } from './product/component/form/product-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-task';

  constructor(@Inject(MODAL_SERVICE) private modalService: IModalService,
  ) {
  }

  productAdd(): void {
    this.modalService.open({
        component: ProductFormComponent,
        title: 'Product create',
        inputs: {product: {}}
      }
    );
  }


}
