import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { STATES } from './logic/states';
import { NgxsModule } from '@ngxs/store';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ResultsComponent } from './modules/modals/results/results.component';
import { registerElement } from 'nativescript-angular';
import { AddNewGameComponent } from './modules/modals/add-new-game/add-new-game.component';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

registerElement('NumericTextField', () => require('nativescript-numeric-keyboard').NumericKeyboardView);

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./modules/home/home.module')
            .then(m => m.HomeModule) },
    { path: 'history', loadChildren: () => import('./modules/history/history.module')
            .then(m => m.HistoryModule) },
];

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        SharedModule,
        NgxsModule.forRoot([ ...STATES ]),
        NgxsEmitPluginModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ResultsComponent,
        AddNewGameComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        ResultsComponent,
        AddNewGameComponent
    ]
})
export class AppModule { }
