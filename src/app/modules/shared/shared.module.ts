import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ActionbarComponent } from './actionbar/actionbar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NativeScriptCommonModule,
        ActionbarComponent
    ],
    declarations: [ActionbarComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
