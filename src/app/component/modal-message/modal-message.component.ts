import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { IModalMessageData } from './types';
import { ModalMessageService } from './modal-message.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-message',
  template: `
      <div *ngIf="data$ | async as data" class="modal-message-overlay">
          <div class="modal-message">
              <div class="card-header bg-{{data.type}}">
                  <div class="card-header--text" [innerHTML]="data.title">
                  </div>
                  <button (click)="close('cancel')" class="btn btn-close window-title--close"></button>
              </div>
              <div class="card-body" [innerHTML]="data.text"></div>

              <div class="card-footer">
                  <button *ngFor="let button of data?.buttons" (click)="close(button.name)" class="btn btn-{{button.type}}">
                      {{button.text}}
                  </button>
              </div>
          </div>
      </div>
  `,
  styleUrls: ['modal-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ModalMessageComponent implements OnInit {

  public data$: Observable<IModalMessageData | null>;

  constructor(private service: ModalMessageService) {
  }

  ngOnInit(): void {
    this.data$ = this.service.onOpen();
  }


  close(button_name: string): void {
    this.service.close(button_name);
  }

}


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ModalMessageComponent],
  declarations: [ModalMessageComponent],
  providers: [],
})
export class ModalMessageModule {
}
