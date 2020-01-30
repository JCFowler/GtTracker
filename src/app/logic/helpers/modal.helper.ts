import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';

@Injectable({ providedIn: 'root' })
export class ModalHelper {

    constructor(private modalService: ModalDialogService) { }

    openModal(component: any, vcRef: ViewContainerRef, fullscreen, context = {}): Promise<any> {
        console.log('Opening modal...');
        const options: ModalDialogOptions = {
            viewContainerRef: vcRef,
            fullscreen: fullscreen,
            context: context,
            animated: true
        };

        return this.modalService.showModal(component, options);
    }
}
