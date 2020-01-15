import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ActionbarComponent } from './actionbar/actionbar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AppTextFieldComponent } from './app-text-field/app-text-field.component';
import { AppSwitchComponent } from './app-switch/app-switch.component';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NativeScriptCommonModule,
        ActionbarComponent,
        AppTextFieldComponent,
        AppSwitchComponent
    ],
    declarations: [
        ActionbarComponent,
        AppTextFieldComponent,
        AppSwitchComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
