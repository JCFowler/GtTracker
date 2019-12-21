import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ActionbarComponent } from './actionbar/actionbar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AppTextFieldComponent } from './app-text-field/app-text-field.component';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NativeScriptCommonModule,
        ActionbarComponent,
        AppTextFieldComponent
    ],
    declarations: [
        ActionbarComponent,
        AppTextFieldComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
