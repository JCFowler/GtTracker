import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ActionbarComponent } from './actionbar/actionbar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AppTextFieldComponent } from './app-text-field/app-text-field.component';
import { AppSwitchComponent } from './app-switch/app-switch.component';
import { AppStatComponent } from './app-stat/app-stat.component';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NativeScriptCommonModule,
        ActionbarComponent,
        AppTextFieldComponent,
        AppSwitchComponent,
        AppStatComponent
    ],
    declarations: [
        ActionbarComponent,
        AppTextFieldComponent,
        AppSwitchComponent,
        AppStatComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
