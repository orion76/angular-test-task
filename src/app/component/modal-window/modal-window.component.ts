import { Component, Inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MODAL_SERVICE } from '../modal-window-overlay/modal.service';
import { IModalService } from '../types';


@Component({
  selector: 'modal-window',
  template: `
      <div class="card-header">
          <div class="card-header--text">
              <ng-content select="[windowTitle]"></ng-content>
          </div>
          <button (click)="close()" class="btn btn-close window-title--close"></button>
      </div>
      <div class="card-body">
          <ng-content></ng-content>
      </div>

      <div class="card-footer">
          <ng-content select="[windowFooter]"></ng-content>
      </div>
  `,
  styleUrls: ['modal-window.component.scss'],
  host: {
    class: 'modal-window card'
  }
})

export class ModalWindowComponent {


  constructor(@Inject(MODAL_SERVICE) private service: IModalService) {
  }


  close(): void {
    this.service.close();
  }
}


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [ModalWindowComponent],
  declarations: [ModalWindowComponent],
  providers: [],
})
export class ModalWindowModule {
}
