import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  Inject,
  NgModule,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MODAL_SERVICE, ModalService } from './modal.service';
import { IModalService } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'modal-window-overlay',
  template: `
      <ng-container #dynamicComponent></ng-container>
  `,
  styleUrls: ['modal-window-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowOverlayComponent implements AfterViewInit, OnDestroy {
  @HostBinding('style.display') public display = 'none';
  @ViewChild('dynamicComponent', {read: ViewContainerRef}) containerRef: ViewContainerRef;
  componentRef: ComponentRef<any>;

  private _subscriptions: Subscription[] = [];

  constructor(@Inject(MODAL_SERVICE) private service: IModalService,
              private cdr: ChangeDetectorRef,
              private resolver: ComponentFactoryResolver) {
  }

  createComponent(component: Type<any>, inputs?: Record<string, any>): void {
    this.containerRef.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.containerRef.createComponent(factory);

    if (inputs) {
      Object.keys(inputs).forEach((property) => {
        this.componentRef.instance[property] = inputs[property];
      });
    }
  }


  destroyComponent(): void {
    this.componentRef.destroy();
  }

  close(): void {
    this.service.close();
  }

  subscribeOpen(): Subscription {
    return this.service.onOpen().subscribe((data) => {
      this.createComponent(data.component, data.inputs);
      this.display = 'block';
      this.cdr.markForCheck();
    });
  }


  subscribeClose(): Subscription {
    return this.service.onClose().subscribe((data) => {
      this.display = 'none';
      this.componentRef.destroy();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this._subscriptions.push(this.subscribeOpen());
    this._subscriptions.push(this.subscribeClose());
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subs => subs.unsubscribe());
  }
}


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [ModalWindowOverlayComponent],
  declarations: [ModalWindowOverlayComponent],
  providers: [
    {provide: MODAL_SERVICE, useClass: ModalService}
  ]
})
export class ModalWindowOverlayModule {
}
