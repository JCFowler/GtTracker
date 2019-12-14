import { NgModule } from '@angular/core';

import { ActionbarComponent } from './actionbar/actionbar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
    imports: [NativeScriptCommonModule],
    exports: [ActionbarComponent],
    declarations: [ActionbarComponent],
    providers: [],
})
export class SharedModule { }
